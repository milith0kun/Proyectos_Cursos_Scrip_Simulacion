export const seoProps = {
  metrics: {
    id: 1,
    keyword: "desarrollo web react",
    searchVolume: 8500,
    difficulty: 45,
    position: 3,
    traffic: 1200,
  },
  analysis: {
    id: 1,
    url: "https://miwebsite.com",
    title: "Desarrollo Web con React | Servicios Profesionales",
    description: "Servicios profesionales de desarrollo web con React...",
    headings: {
      h1: ["Desarrollo Web Profesional"],
      h2: ["Servicios", "Tecnologías"],
      h3: ["React", "TypeScript"],
    },
    wordCount: 1500,
    loadTime: "0.8s",
    mobileOptimized: true,
  },
  competitors: [
    {
      id: 1,
      domain: "competidor1.com",
      authority: 45,
      backlinks: 1200,
      keywords: 850,
      traffic: 15000,
    },
  ],
  onAnalyze: (url: string) => console.log(`Analizando: ${url}`),
};

export const performanceProps = {
  data: {
    loadTime: { mobile: "2.3s", desktop: "1.1s" },
    performanceScore: 85,
    firstContentfulPaint: "1.2s",
    speedIndex: "2.1s",
    largestContentfulPaint: "2.8s",
    timeToInteractive: "3.2s",
    totalBlockingTime: "150ms",
    cumulativeLayoutShift: 0.1,
  },
  onOptimize: () => console.log("Optimizando rendimiento..."),
};

export const nutritionProps = {
  diets: [
    {
      id: 1,
      title: "Dieta Mediterránea",
      description: "Equilibrio y salud",
      url: "/diets/mediterranean",
      benefits: ["Cardioprotectora", "Antiinflamatoria"],
    },
  ],
  recipes: [
    {
      id: 1,
      title: "Ensalada Mediterránea",
      category: "Almuerzo",
      description: "Fresca y nutritiva",
      url: "/recipes/mediterranean-salad",
      nutritionalInfo: {
        calories: 320,
        protein: "12g",
        carbs: "45g",
        fats: "15g",
      },
    },
  ],
  articles: [],
  mentalHealthTips: [
    {
      id: 1,
      title: "Alimentos para el Ánimo",
      description: "Mejora tu estado de ánimo",
      url: "/tips/mood-food",
      relatedFoods: ["Chocolate negro", "Plátanos"],
    },
  ],
  onContactSubmit: (data: any) => console.log("Formulario enviado:", data),
};
