export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  detail: string;
  technologies: string[];
  highlights: string[];
  repository: string;
  liveDemo?: string;
  coverImage?: string;
  coverAlt?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "basic-ed",
    title: "BasicEd Library",
    category: "Web application",
    description:
      "A Laravel starter welcome page, sign-in and registration flows, a minimal dashboard, profile editing, and staff approval management.",
    detail:
      "BasicEd Library brings together the Laravel starter experience and its core account workflows, including staff approval and profile management.",
    technologies: ["Laravel", "Blade", "PHP"],
    highlights: [
      "Welcome, sign-in, and registration flows",
      "Minimal authenticated dashboard",
      "Profile editing and staff approval management",
    ],
    repository: "https://github.com/Richelle1215/BasicEd_Library",
  },
  {
    slug: "smart-kitchen",
    title: "SmartKitchen",
    category: "Web application",
    description:
      "A recipe-community homepage, recipe discovery filters, and seeded cuisine categories. Recipe listings are database-backed.",
    detail:
      "SmartKitchen is a recipe-community experience centered on discovering dishes through cuisine categories and recipe filters.",
    technologies: ["Laravel", "Blade", "Recipes"],
    highlights: [
      "Recipe-community homepage",
      "Recipe discovery filters",
      "Seeded cuisine categories with database-backed listings",
    ],
    repository: "https://github.com/Richelle1215/SmartKitchen",
  },
  {
    slug: "budget-tracker",
    title: "Budget Tracker",
    category: "Android application",
    description:
      "A native Android finance manager built around its Jetpack Compose onboarding and dashboard experience.",
    detail:
      "Budget Tracker is a Kotlin Android project focused on personal finance. Its portfolio overview highlights the onboarding flow and dashboard from the application.",
    technologies: ["Kotlin", "Android", "Jetpack Compose"],
    highlights: [
      "Native Android application",
      "Jetpack Compose onboarding flow",
      "Personal finance dashboard",
    ],
    repository: "https://github.com/Richelle1215/Budget-Tracker",
  },
  {
    slug: "hayst",
    title: "HAYST",
    category: "Static website",
    description:
      "A standalone static marketplace landing page from the HAYST repository.",
    detail:
      "HAYST is the static marketplace landing page in its repository. It is separate from the nested LUMIÈRE storefront.",
    technologies: ["HTML", "Static site"],
    highlights: [
      "Static marketplace landing page",
      "Standalone project in the HAYST repository",
      "Separate from the nested LUMIÈRE storefront",
    ],
    repository: "https://github.com/Richelle1215/HAYST",
  },
  {
    slug: "pet-health",
    title: "PetHealthTracker",
    category: "Android application",
    description:
      "A native Android app with a robot-themed home, pet BMI, mini-games, and a robot customization closet.",
    detail:
      "PetHealthTracker is a Kotlin Android companion with four Compose experiences for pet health and playful robot customization.",
    technologies: ["Kotlin", "Android", "Jetpack Compose"],
    highlights: [
      "Robot-themed home screen",
      "Pet BMI experience and mini-game cards",
      "Robot customization closet",
    ],
    repository: "https://github.com/Richelle1215/PetHealthTracker",
  },
  {
    slug: "lumiere",
    title: "LUMIÈRE Store",
    category: "E-commerce storefront",
    description:
      "A luxury jewelry storefront nested inside the HAYST project.",
    detail:
      "LUMIÈRE is the jewelry storefront within HAYST. The standalone LARAVEL-E-COMMERCE repository contains a README; this project UI lives in HAYST.",
    technologies: ["Laravel", "Blade", "E-commerce"],
    highlights: [
      "Luxury jewelry storefront",
      "Nested in the HAYST project",
      "Source UI is maintained in the HAYST repository",
    ],
    repository:
      "https://github.com/Richelle1215/HAYST/tree/main/LARAVEL_E-COMMERCE_PROJECT",
    coverImage: "/project-previews/lumiere-cover.webp",
    coverAlt: "LUMIÈRE storefront cover image",
  },
];
