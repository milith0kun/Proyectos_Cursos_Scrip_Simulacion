// Types para la página de nutrición
export type MenuItem = {
  id: number;
  text: string;
  href: string;
};

export type DietInfo = {
  id: number;
  title: string;
  description: string;
  url: string;
  benefits: string[];
};

export type Recipe = {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string;
  nutritionalInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fats: string;
  };
};

export type HealthArticle = {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  readTime: string;
};

export type MentalHealthTip = {
  id: number;
  title: string;
  description: string;
  url: string;
  relatedFoods: string[];
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
};
