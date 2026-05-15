-- English runtime content for agent-facing skills and seeded prompts.
-- This migration intentionally updates rows created by earlier migrations.

UPDATE public.skills
SET skill_content = $skill_content$
---
name: canvas-design
description: Create beautiful visual art as .png and .pdf files using design philosophy. Use when the user asks to create a poster, visual artwork, design piece, or static visual output via code generation. Requires the execute tool and Python with Pillow/reportlab.
license: Apache-2.0
metadata:
  author: anthropic
  version: "1.0"
  adapted-for: loomic
---

# Canvas Design Skill

These are instructions for creating visual artwork through code execution.
Output .md (philosophy) + .pdf or .png (artwork) files.

## Prerequisites

This skill requires:
- The `execute` tool (sandbox code execution)
- Python 3 with `Pillow` and `reportlab` installed
- Font files available at the path in the `$FONT_DIR` environment variable

## Workflow

Complete in two steps:
1. Design Philosophy Creation (.md concept)
2. Express by creating it on a canvas via Python code execution (.pdf or .png)

## Step 1: Design Philosophy

Create a visual philosophy, not layouts or templates, interpreted through form, space, color, composition, images, graphics, shapes, patterns, and minimal text as visual accent.

Name the movement in 1-2 words, such as "Brutalist Joy" or "Chromatic Silence".

Write 4-6 paragraphs covering space and form, color and material, scale and rhythm, composition and balance, and visual hierarchy.

Critical guidelines:
- Avoid redundancy; mention each design aspect once.
- Emphasize craftsmanship repeatedly: "meticulously crafted", "master-level execution".
- Leave creative space for interpretation.
- Keep all visible text and user-facing explanations in English unless the user explicitly requests another language.

## Step 2: Canvas Creation

Use the `execute` tool to run Python code that generates the artwork.

### Path Rules

Virtual paths vs real paths: `ls` and `read_file` use virtual paths such as `/skills/...`, but `execute` runs in a real shell. Python code must use real filesystem paths.

Rules:
1. Font paths: always use `os.environ["FONT_DIR"]`; do not hardcode paths.
2. Output files: always save with relative paths such as `output.png`.
3. Do not use virtual paths seen from `ls /skills/...` inside Python code.

### Font Usage

Fonts are accessed through the `$FONT_DIR` environment variable:

```python
import os
font_dir = os.environ["FONT_DIR"]
fonts = [f for f in os.listdir(font_dir) if f.endswith(".ttf")]
```

Load fonts with Pillow:

```python
from PIL import ImageFont
font = ImageFont.truetype(os.path.join(font_dir, "WorkSans-Bold.ttf"), size=48)
```

Or with reportlab for PDF:

```python
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("WorkSans", os.path.join(font_dir, "WorkSans-Bold.ttf")))
```

## Design Principles

- Create museum/magazine-quality work with dense patterns, systematic shapes, and precise typography.
- Use a limited color palette of 3-5 intentional colors.
- Text is always minimal and visual-first; never use paragraphs inside the artwork.
- Use different fonts for different roles such as display, body, labels, and accents.
- Nothing may overlap; all elements must stay within canvas boundaries with proper margins.
- Never look cartoony or amateur; even playful subjects must stay sophisticated.

## Code Execution Pattern

Write a complete Python script, then execute it.

All file paths must be relative:

```text
1. write_file path="generate.py"
2. execute: python3 generate.py
3. Output: img.save("output.png")
4. execute: pwd
5. persist_sandbox_file filePath="{pwd output}/output.png"
```

Critical:
- Use `os.environ["FONT_DIR"]` for font paths. This is the only allowed absolute path.
- Save output with relative paths, for example `img.save("poster.png")`.
- Do not use `/skills/...` paths; those are virtual backend paths.

## Step 3: Persist Output

After generating the artwork file, use `persist_sandbox_file` to upload it to persistent storage.

## Important Notes

- Always write complete Python scripts.
- Recommended canvas size: 2400x3200 px for posters, 1920x1080 for landscapes.
- Save output as PNG for raster or PDF for print-quality.
- The subtle reference from the user's request should be woven into the art like a jazz musician quoting another song: perceptible to insiders but invisible to others.
$skill_content$
WHERE slug = 'canvas-design';

UPDATE public.skills
SET skill_content = $skill_content$
---
name: json-image-prompt
description: Use structured JSON prompts for AI image generation instead of free-form text. Produces more consistent, controllable, and high-quality results. Activate when the user asks to generate, create, or design images, illustrations, photos, posters, or any visual content via the generate_image tool.
license: Apache-2.0
metadata:
  author: loomic
  version: "1.0"
---

# JSON Image Prompt Skill

When generating images, always decompose the user's request into a structured JSON prompt before calling `generate_image`. JSON prompts reduce ambiguity, improve consistency, and give the image model clearer instructions.

Keep all internal reasoning, generated prompts, visible labels, and user-facing explanations in English unless the user explicitly requests another language.

## JSON Prompt Schema

Always structure the prompt as a JSON object with these fields:

```json
{
  "subject": {
    "type": "what the main subject is: person, object, or scene",
    "details": "key features, pose, expression, material, texture",
    "framing": "composition: full body, half body, close-up, overhead, wide shot"
  },
  "environment": {
    "setting": "scene description",
    "time": "time of day or period",
    "weather": "weather or atmospheric conditions"
  },
  "style": {
    "genre": "visual style: photorealistic, illustration, anime, oil painting, 3d render, watercolor, flat design",
    "reference": "aesthetic reference such as Studio Ghibli, Swiss design, Brutalist, Art Deco",
    "color_palette": "warm, cool, monochrome, muted, vibrant, plus exact color values when useful"
  },
  "lighting": {
    "type": "light source: natural, studio, neon, ambient, volumetric",
    "direction": "light direction: front, back, side, top, rim",
    "quality": "light quality: soft, harsh, diffused, dramatic, golden hour"
  },
  "camera": {
    "angle": "camera angle: eye-level, low-angle, high-angle, dutch-angle, overhead",
    "lens": "lens: wide-angle, telephoto, macro, fisheye, tilt-shift",
    "depth_of_field": "depth of field: shallow, deep, selective"
  },
  "mood": "emotional tone, 1-3 keywords",
  "negative": "elements to avoid, optional"
}
```

## Workflow

1. Analyze the user's intent into subject, style, lighting, and mood.
2. Build the JSON prompt internally.
3. Flatten it into a concise English prompt for `generate_image`.

When converting JSON to a prompt, order information by importance: subject > style > lighting > camera > environment > mood > negative.

## Important Principles

1. Before every image generation, build the JSON structure internally, even if you do not show it to the user.
2. Subject is always most important. If the subject is vague, all other parameters become less useful.
3. Less is more. Use precise 2-5 word phrases in each field, not prose.
4. The negative field matters. Clearly exclude unwanted elements such as text, watermark, deformation, or clutter.
5. Iterate surgically. If the first result is not good, adjust only 1-2 fields rather than rewriting everything.
6. Make color concrete. "warm tones" is weaker than "golden amber (#D4A574) with deep burgundy (#722F37) accents".
7. When a brand kit is available, use `get_brand_kit` to retrieve brand colors and fonts, then inject them into `style.color_palette` and `subject.details`.
$skill_content$
WHERE slug = 'json-image-prompt';

UPDATE public.home_discovery_categories
SET label = CASE key
  WHEN 'branding-design' THEN 'Brand design'
  WHEN 'poster-and-ads' THEN 'Posters and ads'
  WHEN 'illustration' THEN 'Illustration'
  WHEN 'ui-design' THEN 'UI design'
  WHEN 'character-design' THEN 'Character design'
  WHEN 'storyboard-video' THEN 'Video and storyboards'
  WHEN 'product-design' THEN 'Product design'
  WHEN 'architecture-design' THEN 'Architecture design'
  ELSE label
END;

UPDATE public.home_discovery_cases
SET seed_prompt = CASE id
  WHEN 'ji5ey5l' THEN 'Use the ART & Cultural Arts Center direction to explore a brand identity for a cultural arts center. Provide brand keywords, key visual direction, poster extensions, and social media visual proposals with a modern, cultured tone suitable for promoting art events.'
  WHEN 'n9d21de' THEN 'Design a set of vintage car posters. Include a main poster, square social media versions, and title typography recommendations. Keep the style retro, film-like, and suitable for event promotion.'
  WHEN 'bjde0nh' THEN 'Expand the Cat Tarot Cards theme into a cat tarot illustration series. Provide character settings, card visual language, color suggestions, and directions for extendable merchandise.'
  WHEN 'tl8zzk0' THEN 'Inspired by a Fallout-themed cake shop website, design a post-apocalyptic bakery homepage. Provide homepage information architecture, hero visual direction, product card styles, and core color suggestions.'
  WHEN 'fbn3mss' THEN 'Create a creepy circus character design around My Creepy Clown Avatar in Abandoned Circus Park. Include character settings, expression variations, costume elements, and scene atmosphere suggestions.'
  WHEN 'ikqo02k' THEN 'Create a music-emotion short video storyboard based on Mixtapes Emotions. Break down shot rhythm, emotional transitions, title cards, and visual style suggestions for a 15 to 30 second short video.'
  WHEN 'a4ncmvb' THEN 'Design futuristic robot hand product visuals around Product Visualization - Robot Hand. Provide product selling-point messaging, main visual composition, material direction, and e-commerce image ideas.'
  WHEN 'ng716s0' THEN 'Starting from Building a new website and learning how to AI, design a website concept for an architecture studio. Provide site structure, homepage visual direction, project showcase modules, and an architectural visual style.'
  ELSE seed_prompt
END;

ALTER TABLE public.brand_kits
ALTER COLUMN name SET DEFAULT 'Untitled';

UPDATE public.brand_kits
SET name = 'Untitled'
WHERE name = U&'\672A\547D\540D';
