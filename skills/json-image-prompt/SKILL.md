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

## Why JSON Over Free-Form Text

| Free-form | JSON |
|-----------|------|
| "A beautiful sunset over mountains with dramatic lighting" | Each attribute is a separate, unambiguous key-value pair |
| The model guesses what "beautiful" and "dramatic" mean | You define exact choices: golden hour, rim lighting, warm tones |
| Hard to iterate because everything is rewritten | Change one field while keeping the rest stable |
| Results vary across runs | A repeated structure improves reproducible quality |

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

### Step 1: Analyze the User's Intent

If the user says "Generate a futuristic product image", do not write a one-sentence prompt immediately. First decompose it:
- Subject: product, including product type and angle
- Style: futuristic means minimalist, clean, advanced, premium
- Lighting: futuristic products often use studio light and rim lighting
- Mood: professional, modern, premium

### Step 2: Build the JSON Prompt

```json
{
  "subject": {
    "type": "wireless earbuds",
    "details": "matte black finish, floating in air, slight rotation showing both sides",
    "framing": "centered product shot"
  },
  "environment": {
    "setting": "pure dark gradient background",
    "time": "N/A, studio",
    "weather": "N/A"
  },
  "style": {
    "genre": "photorealistic product photography",
    "reference": "Apple product page aesthetic",
    "color_palette": "dark palette with selective blue and white accents"
  },
  "lighting": {
    "type": "studio",
    "direction": "rim lighting from behind, subtle fill from front",
    "quality": "dramatic, high contrast"
  },
  "camera": {
    "angle": "eye-level, slightly elevated",
    "lens": "macro, 100mm equivalent",
    "depth_of_field": "shallow, product in sharp focus"
  },
  "mood": "premium, futuristic, minimal",
  "negative": "text, watermark, human hands, cluttered background"
}
```

### Step 3: Convert JSON to a Prompt String

Flatten the JSON into a structured prompt for `generate_image`:

```text
Product photography of wireless earbuds, matte black finish, floating in air with slight rotation showing both sides. Centered product shot. Pure dark gradient background. Photorealistic product photography, Apple product page aesthetic. Dark palette with selective blue and white accents. Studio rim lighting from behind with subtle fill from front, dramatic high contrast. Eye-level macro shot at 100mm, shallow depth of field with product in sharp focus. Premium, futuristic, minimal mood. Avoid text, watermark, human hands, cluttered background.
```

When converting JSON to a prompt, order information by importance: subject > style > lighting > camera > environment > mood > negative.

## Scene Templates

### Portrait Photography

```json
{
  "subject": {
    "type": "portrait of [person description]",
    "details": "[expression], [clothing], [pose]",
    "framing": "bust shot, headshot, or full body"
  },
  "style": {
    "genre": "editorial photography",
    "color_palette": "warm skin tones, muted background"
  },
  "lighting": {
    "type": "natural",
    "direction": "side, Rembrandt lighting pattern",
    "quality": "soft, golden hour"
  },
  "camera": {
    "lens": "85mm portrait lens",
    "depth_of_field": "shallow, f/1.8"
  },
  "mood": "intimate, contemplative"
}
```

### Concept Illustration

```json
{
  "subject": {
    "type": "[concept or scene]",
    "details": "[key visual elements]",
    "framing": "wide establishing shot"
  },
  "style": {
    "genre": "digital illustration",
    "reference": "[art style reference]",
    "color_palette": "[specific palette or mood-based palette]"
  },
  "lighting": {
    "type": "volumetric or atmospheric",
    "quality": "cinematic"
  },
  "mood": "[2-3 emotion keywords]"
}
```

### Brand or Marketing Visual

```json
{
  "subject": {
    "type": "[product or brand element]",
    "details": "[brand-specific details]",
    "framing": "hero shot"
  },
  "style": {
    "genre": "commercial photography or 3d render",
    "reference": "[brand aesthetic]",
    "color_palette": "[brand colors]"
  },
  "lighting": {
    "type": "studio, three-point",
    "quality": "clean, professional"
  },
  "mood": "aspirational, on-brand"
}
```

## Important Principles

1. Before every image generation, build the JSON structure internally, even if you do not show it to the user.
2. Subject is always most important. If the subject is vague, all other parameters become less useful.
3. Less is more. Use precise 2-5 word phrases in each field, not prose.
4. The negative field matters. Clearly exclude unwanted elements such as text, watermark, deformation, or clutter.
5. Iterate surgically. If the first result is not good, adjust only 1-2 fields rather than rewriting everything.
6. Make color concrete. "warm tones" is weaker than "golden amber (#D4A574) with deep burgundy (#722F37) accents".
7. When a brand kit is available, use `get_brand_kit` to retrieve brand colors and fonts, then inject them into `style.color_palette` and `subject.details`.
