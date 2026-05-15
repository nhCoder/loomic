import type { StructuredTool } from "@langchain/core/tools";
import type { BackendFactory, BackendProtocol } from "deepagents";

import type { ConnectionManager } from "../../ws/connection-manager.js";
import { createBrandKitTool } from "./brand-kit.js";
import { createInspectCanvasTool } from "./inspect-canvas.js";
import { createManipulateCanvasTool } from "./manipulate-canvas.js";
import {
  createImageGenerateTool,
  type PersistImageFn,
  type SubmitImageJobFn,
} from "./image-generate.js";
import { createProjectSearchTool } from "./project-search.js";
import { createScreenshotCanvasTool } from "./screenshot-canvas.js";
import {
  createVideoGenerateTool,
  type SubmitVideoJobFn,
} from "./video-generate.js";
import { createPersistSandboxFileTool } from "./persist-sandbox-file.js";

export { createImageGenerateTool } from "./image-generate.js";
export { createVideoGenerateTool } from "./video-generate.js";
export { createInspectCanvasTool } from "./inspect-canvas.js";
export { createManipulateCanvasTool } from "./manipulate-canvas.js";

// ---------------------------------------------------------------------------
// deepagents built-in tool reference (automatically injected by FilesystemMiddleware)
// ---------------------------------------------------------------------------
//
// deepagents@1.8.4 automatically injects the following tools through
// createFilesystemMiddleware. Custom tool names must not conflict with them:
//
//   ls          — list directory contents
//   read_file   — read file contents (supports offset/limit)
//   write_file  — write files
//   edit_file   — edit files with find and replace
//   glob        — match file paths by pattern
//   grep        — search file contents by regex
//   execute     — run shell commands (only when SandboxBackendProtocol is available)
//   task        — delegate subtasks to subagents
//   write_todos — manage TODO lists
//
// LocalShellBackend is the CompositeBackend default backend. It implements
// SandboxBackendProtocol, so the execute tool is available automatically.
// Code execution does not need an extra custom tool.
//
// CompositeBackend routes are independent:
//   /workspace/  → StoreBackend (PostgresStore) — file persistence
//   /memories/   → StoreBackend (PostgresStore) — agent memory
//   /skills/     → FilesystemBackend            — system skills
//   default      → LocalShellBackend            — execute + temporary files
// ---------------------------------------------------------------------------

export function createMainAgentTools(
  backend: BackendProtocol | BackendFactory,
  deps: {
    createUserClient: (accessToken: string) => any;
    brandKitId?: string | null;
    connectionManager?: ConnectionManager;
    persistImage?: PersistImageFn;
    sandboxDir?: string;
    submitImageJob?: SubmitImageJobFn;
    submitVideoJob?: SubmitVideoJobFn;
  },
) {
  const tools: StructuredTool[] = [
    createProjectSearchTool(backend),
    createInspectCanvasTool(deps),
    createManipulateCanvasTool(deps),
    createImageGenerateTool({
      ...(deps.persistImage ? { persistImage: deps.persistImage } : {}),
      ...(deps.submitImageJob ? { submitImageJob: deps.submitImageJob } : {}),
    }),
    createVideoGenerateTool({
      ...(deps.submitVideoJob ? { submitVideoJob: deps.submitVideoJob } : {}),
    }),
    createPersistSandboxFileTool({
      createUserClient: deps.createUserClient,
      ...(deps.sandboxDir ? { sandboxDir: deps.sandboxDir } : {}),
    }),
    // The execute tool is automatically injected by deepagents FilesystemMiddleware
    // because the CompositeBackend default backend is LocalShellBackend.
    // It does not need to be registered manually here.
  ];
  if (deps.brandKitId) {
    tools.push(createBrandKitTool(deps, deps.brandKitId));
  }
  if (deps.connectionManager) {
    tools.push(createScreenshotCanvasTool({
      connectionManager: deps.connectionManager,
      ...(deps.persistImage ? { persistImage: deps.persistImage } : {}),
    }));
  }
  return tools;
}

/** @deprecated Use createMainAgentTools + sub-agents instead */
export function createPhaseATools(backend: BackendProtocol | BackendFactory) {
  return [
    createProjectSearchTool(backend),
    createImageGenerateTool(),
    createVideoGenerateTool(),
  ] as const;
}
