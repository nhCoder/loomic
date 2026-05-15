export type HomeDiscoveryCase = {
  id: string;
  title: string;
  coverImageUrl: string;
  authorName: string;
  authorAvatarUrl: string;
  viewCount: number;
  likeCount: number;
  prompt: string;
  sourceUrl?: string;
};

export type HomeDiscoveryCategory = {
  key: string;
  label: string;
  cases: HomeDiscoveryCase[];
};

export type HomeDiscoverySelection = HomeDiscoveryCase & {
  categoryKey: string;
  categoryLabel: string;
};

function createCase(
  id: string,
  title: string,
  coverImageUrl: string,
  authorName: string,
  authorAvatarUrl: string,
  viewCount: number,
  likeCount: number,
  prompt: string,
  sourceUrl?: string,
): HomeDiscoveryCase {
  return {
    id,
    title,
    coverImageUrl,
    authorName,
    authorAvatarUrl,
    viewCount,
    likeCount,
    prompt,
    ...(sourceUrl ? { sourceUrl } : {}),
  };
}

function createCategory(
  key: string,
  label: string,
  cases: HomeDiscoveryCase[],
): HomeDiscoveryCategory {
  return { key, label, cases };
}

/**
 * Discovery seeds mirrored from Lovart's lower "Inspiration discovery" section.
 * Each category intentionally starts with one case so the team can replace
 * content later from Supabase without touching the UI layer.
 */
export const homeDiscoverySeedCategories: HomeDiscoveryCategory[] = [
  createCategory("branding-design", "Brand design", [
    createCase(
      "ji5ey5l",
      "The ART & Cultural Arts Center",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/branding-design/cover.webp",
      "Studio Arken",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/avatars/branding-design.svg",
      549,
      7,
      "Use the ART & Cultural Arts Center direction to explore a brand identity for a cultural arts center. Provide brand keywords, key visual direction, poster extensions, and social media visual proposals with a modern, cultured tone suitable for promoting art events.",
    ),
  ]),
  createCategory("poster-and-ads", "Posters and ads", [
    createCase(
      "n9d21de",
      "Vintage Car Poster",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/poster-and-ads/cover.webp",
      "Retro Workshop",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/avatars/poster-and-ads.svg",
      359919,
      286,
      "Design a set of vintage car posters. Include a main poster, square social media versions, and title typography recommendations. Keep the style retro, film-like, and suitable for event promotion.",
    ),
  ]),
  createCategory("illustration", "Illustration", [
    createCase(
      "bjde0nh",
      "Cat Tarot Cards",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/illustration/cover.webp",
      "Mochi Art",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/avatars/illustration.svg",
      2054,
      116,
      "Expand the Cat Tarot Cards theme into a cat tarot illustration series. Provide character settings, card visual language, color suggestions, and directions for extendable merchandise.",
    ),
  ]),
  createCategory("ui-design", "UI design", [
    createCase(
      "tl8zzk0",
      "Fallout-themed cake shop website.",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/ui-design/cover.webp",
      "Pixel Forge",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/avatars/ui-design.svg",
      4338,
      192,
      "Inspired by a Fallout-themed cake shop website, design a post-apocalyptic bakery homepage. Provide homepage information architecture, hero visual direction, product card styles, and core color suggestions.",
    ),
  ]),
  createCategory("character-design", "Character design", [
    createCase(
      "fbn3mss",
      "My Creepy Clown Avatar in Abandoned Circus Park",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/character-design/cover.webp",
      "Dark Carnival",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/avatars/character-design.svg",
      749,
      12,
      "Create a creepy circus character design around My Creepy Clown Avatar in Abandoned Circus Park. Include character settings, expression variations, costume elements, and scene atmosphere suggestions.",
    ),
  ]),
  createCategory("storyboard-video", "Video and storyboards", [
    createCase(
      "ikqo02k",
      "Mixtapes Emotions !",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/storyboard-video/cover.webp",
      "Frame Studio",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/avatars/storyboard-video.svg",
      3057,
      49,
      "Create a music-emotion short video storyboard based on Mixtapes Emotions. Break down shot rhythm, emotional transitions, title cards, and visual style suggestions for a 15 to 30 second short video.",
    ),
  ]),
  createCategory("product-design", "Product design", [
    createCase(
      "a4ncmvb",
      "Product Visualization - Robot Hand ",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/product-design/cover.webp",
      "Future Lab",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/avatars/product-design.svg",
      769,
      27,
      "Design futuristic robot hand product visuals around Product Visualization - Robot Hand. Provide product selling-point messaging, main visual composition, material direction, and e-commerce image ideas.",
    ),
  ]),
  createCategory("architecture-design", "Architecture design", [
    createCase(
      "ng716s0",
      "Building a new website and learning how to AI",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/architecture-design/cover.webp",
      "Arc Design",
      "https://jmcrxgenontlkxktpihl.supabase.co/storage/v1/object/public/project-assets/home-seeds/discovery/avatars/architecture-design.svg",
      1453,
      24,
      "Starting from Building a new website and learning how to AI, design a website concept for an architecture studio. Provide site structure, homepage visual direction, project showcase modules, and an architectural visual style.",
    ),
  ]),
];
