// ---------------------------------------------------------------------------
// Loomic Pricing Data
// ---------------------------------------------------------------------------

export type BillingPeriod = "monthly" | "yearly";

export interface PricingTier {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number; // per month
  credits: number;
  creditLabel: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
  cta: string;
  ctaVariant: "default" | "accent" | "outline";
}

export interface FeatureCategory {
  name: string;
  features: FeatureRow[];
}

export interface FeatureRow {
  name: string;
  tiers: Record<string, string | boolean>;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// Tiers
// ---------------------------------------------------------------------------

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    nameEn: "Free",
    description: "Experience the magic of AI creation",
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: 1500,
    creditLabel: "50 credits/day",
    features: [
      "3 basic image models",
      "Up to 1K resolution",
      "3 projects",
      "1 brand kit",
      "Community support",
    ],
    cta: "Start free",
    ctaVariant: "outline",
  },
  {
    id: "starter",
    name: "Starter",
    nameEn: "Starter",
    description: "A starting point for individual creators",
    monthlyPrice: 12,
    yearlyPrice: 9,
    credits: 1200,
    creditLabel: "1,200 credits/month",
    features: [
      "All image models",
      "2 basic video models",
      "Up to 1K resolution",
      "10 projects",
      "3 brand kits",
      "Personal commercial license",
    ],
    cta: "Choose Starter",
    ctaVariant: "default",
  },
  {
    id: "pro",
    name: "Pro",
    nameEn: "Pro",
    description: "The choice for professional designers",
    monthlyPrice: 39,
    yearlyPrice: 29,
    credits: 5000,
    creditLabel: "5,000 credits/month",
    badge: "Most popular",
    highlighted: true,
    features: [
      "All image and video models",
      "Up to 2K resolution",
      "4 concurrent jobs",
      "50 projects",
      "10 brand kits",
      "Full commercial license",
      "Email support",
    ],
    cta: "Choose Pro",
    ctaVariant: "accent",
  },
  {
    id: "ultra",
    name: "Ultra",
    nameEn: "Ultra",
    description: "For teams and high-output studios",
    monthlyPrice: 99,
    yearlyPrice: 79,
    credits: 15000,
    creditLabel: "15,000 credits/month",
    badge: "Best value",
    features: [
      "Everything in Pro",
      "Up to 4K resolution",
      "8 concurrent jobs",
      "200 projects",
      "30 brand kits",
      "3 team seats",
      "API access (Beta)",
      "Priority email support",
    ],
    cta: "Choose Ultra",
    ctaVariant: "default",
  },
  {
    id: "business",
    name: "Business",
    nameEn: "Business",
    description: "Creative production at scale",
    monthlyPrice: 249,
    yearlyPrice: 199,
    credits: 50000,
    creditLabel: "50,000 credits/month",
    features: [
      "Everything in Ultra",
      "12 concurrent jobs",
      "Unlimited projects",
      "100 brand kits",
      "10+ team seats",
      "Full API access",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    ctaVariant: "outline",
  },
];

// ---------------------------------------------------------------------------
// Feature Comparison
// ---------------------------------------------------------------------------

export const featureCategories: FeatureCategory[] = [
  {
    name: "Creation capabilities",
    features: [
      {
        name: "Image generation models",
        tiers: { free: "Basic 3", starter: "All", pro: "All", ultra: "All", business: "All" },
      },
      {
        name: "Video generation models",
        tiers: { free: false, starter: "Basic 2", pro: "All", ultra: "All", business: "All" },
      },
      {
        name: "Maximum resolution",
        tiers: { free: "1K", starter: "1K", pro: "2K", ultra: "4K", business: "4K" },
      },
      {
        name: "Concurrent jobs",
        tiers: { free: "1", starter: "2", pro: "4", ultra: "8", business: "12" },
      },
    ],
  },
  {
    name: "Credits and usage",
    features: [
      {
        name: "Monthly credits",
        tiers: { free: "50/day", starter: "1,200", pro: "5,000", ultra: "15,000", business: "50,000" },
      },
      {
        name: "Credit top-up discount",
        tiers: { free: false, starter: false, pro: "10%", ultra: "15%", business: "20%" },
      },
      {
        name: "Credit validity",
        tiers: { free: "Same day", starter: "Current month", pro: "Current month", ultra: "Current month", business: "Current month" },
      },
    ],
  },
  {
    name: "Collaboration and management",
    features: [
      {
        name: "Project count",
        tiers: { free: "3", starter: "10", pro: "50", ultra: "200", business: "Unlimited" },
      },
      {
        name: "Brand kits",
        tiers: { free: "1", starter: "3", pro: "10", ultra: "30", business: "100" },
      },
      {
        name: "Team seats",
        tiers: { free: false, starter: false, pro: false, ultra: "3", business: "10+" },
      },
      {
        name: "API access",
        tiers: { free: false, starter: false, pro: false, ultra: "Beta", business: true },
      },
    ],
  },
  {
    name: "Benefits and support",
    features: [
      {
        name: "Commercial license",
        tiers: { free: false, starter: "Personal", pro: true, ultra: true, business: true },
      },
      {
        name: "File storage",
        tiers: { free: "7 days", starter: "30 days", pro: "1 year", ultra: "1 year", business: "Forever" },
      },
      {
        name: "Customer support",
        tiers: { free: "Community", starter: "Community", pro: "Email", ultra: "Priority email", business: "Dedicated support" },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faqItems: FAQItem[] = [
  {
    question: "How are credits calculated?",
    answer:
      "Each generation uses a different number of credits. A standard image costs about 5 credits, an HD image about 10 credits, and a standard 5-second video about 40 credits. Higher-end AI models or higher resolutions use more credits.",
  },
  {
    question: "Do unused credits roll over?",
    answer:
      "Subscription credits reset every billing cycle and do not roll over. Extra credits purchased through top-ups never expire.",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer:
      "You can upgrade anytime and we will prorate the difference. Downgrades take effect at the end of the current billing cycle. After upgrading, you immediately receive the new plan features and credits.",
  },
  {
    question: "How does annual billing work?",
    answer:
      "Annual plans are paid once per year and save about 25% compared with monthly billing. Annual plans include the same features, and credits reset monthly.",
  },
  {
    question: "How do team seats work?",
    answer:
      "Ultra and Business include team seats. Each team member shares the plan credit pool and can create projects and use brand kits independently. Contact us if you need more seats.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "We accept major credit and debit cards through Stripe, including Visa, Mastercard, and American Express.",
  },
  {
    question: "How do I request a refund?",
    answer:
      "You can request a full refund within 7 days of subscribing if you have not used any credits. Refunds are not supported after 7 days or after credits are used. Please contact support to request a refund.",
  },
];

// ---------------------------------------------------------------------------
// Animation variants (shared across pricing components)
// ---------------------------------------------------------------------------

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

export const cardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};
