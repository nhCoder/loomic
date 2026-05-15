import OpenAI from "openai";

import type {
  GeneratedImage,
  ImageGenerateParams,
  ImageProvider,
  ImageQuality,
  ModelInfo,
  OutputFormat,
} from "../types.js";
import { GenerationError } from "../utils.js";

const PROVIDER_NAME = "openai";
const ICON_OPENAI = "https://github.com/openai.png";

const MODEL_MAP: Record<string, string> = {
  "openai-official/gpt-image-2": "gpt-image-2",
  "openai-official/gpt-image-1.5": "gpt-image-1.5",
  "openai-official/gpt-image-1": "gpt-image-1",
  "openai-official/gpt-image-1-mini": "gpt-image-1-mini",
};

const OPENAI_IMAGE_MODELS: readonly ModelInfo[] = [
  {
    id: "openai-official/gpt-image-2",
    displayName: "GPT Image 2",
    description:
      "OpenAI's latest GPT Image model via the direct OpenAI Image API. Best for text-to-image quality, instruction following, and rendering text.",
    iconUrl: ICON_OPENAI,
  },
  {
    id: "openai-official/gpt-image-1.5",
    displayName: "GPT Image 1.5",
    description:
      "OpenAI GPT Image 1.5 via the direct OpenAI Image API. Strong instruction following, text rendering, and detailed image generation.",
    iconUrl: ICON_OPENAI,
  },
  {
    id: "openai-official/gpt-image-1",
    displayName: "GPT Image 1",
    description:
      "OpenAI GPT Image 1 via the direct OpenAI Image API. Previous GPT Image generation model.",
    iconUrl: ICON_OPENAI,
  },
  {
    id: "openai-official/gpt-image-1-mini",
    displayName: "GPT Image 1 Mini",
    description:
      "Cost-efficient OpenAI GPT Image model via the direct OpenAI Image API.",
    iconUrl: ICON_OPENAI,
  },
];

const QUALITY_MAP: Record<ImageQuality, "low" | "medium" | "high"> = {
  standard: "low",
  hd: "medium",
  ultra: "high",
};

const FORMAT_MAP: Record<OutputFormat, "png" | "jpeg" | "webp"> = {
  png: "png",
  jpg: "jpeg",
  webp: "webp",
};

function aspectRatioToOpenAISize(aspectRatio: string | undefined): {
  size: "1024x1024" | "1536x1024" | "1024x1536";
  width: number;
  height: number;
} {
  const [wStr, hStr] = (aspectRatio ?? "1:1").split(":");
  const w = Number(wStr);
  const h = Number(hStr);
  const ratio = w && h ? w / h : 1;

  if (ratio > 1.2) {
    return { size: "1536x1024", width: 1536, height: 1024 };
  }
  if (ratio < 0.8) {
    return { size: "1024x1536", width: 1024, height: 1536 };
  }
  return { size: "1024x1024", width: 1024, height: 1024 };
}

function dataUriFromBase64(mimeType: string, data: string): string {
  return `data:${mimeType};base64,${data}`;
}

export class OpenAIImageProvider implements ImageProvider {
  readonly name = PROVIDER_NAME;
  readonly models = OPENAI_IMAGE_MODELS;
  private client: OpenAI;

  constructor(apiKey: string, baseURL?: string) {
    this.client = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });
  }

  async generate(params: ImageGenerateParams): Promise<GeneratedImage> {
    const apiModel = MODEL_MAP[params.model];
    if (!apiModel) {
      throw new GenerationError(
        PROVIDER_NAME,
        "model_not_found",
        `Unknown OpenAI image model: ${params.model}`,
      );
    }

    if (params.inputImages?.length) {
      throw new GenerationError(
        PROVIDER_NAME,
        "unsupported_input",
        "Direct OpenAI image editing with reference images is not wired yet. Use a Google/Nano Banana or Replicate image model for reference-image editing.",
      );
    }

    const { size, width, height } = aspectRatioToOpenAISize(params.aspectRatio);
    const outputFormat = FORMAT_MAP[params.outputFormat ?? "png"];
    const mimeType = outputFormat === "jpeg" ? "image/jpeg" : `image/${outputFormat}`;

    try {
      const response = await this.client.images.generate({
        model: apiModel,
        prompt: params.prompt,
        size,
        quality: QUALITY_MAP[params.quality ?? "hd"],
        output_format: outputFormat,
        n: 1,
      } as any);

      const image = response.data?.[0];
      const url = image?.url;
      const b64Json = image?.b64_json;
      if (!url && !b64Json) {
        throw new GenerationError(PROVIDER_NAME, "no_output", "OpenAI returned no image data");
      }

      return {
        url: url ?? dataUriFromBase64(mimeType, b64Json!),
        mimeType,
        width,
        height,
      };
    } catch (error) {
      if (error instanceof GenerationError) throw error;
      throw new GenerationError(
        PROVIDER_NAME,
        "api_error",
        error instanceof Error ? error.message : "Unknown OpenAI error",
      );
    }
  }
}
