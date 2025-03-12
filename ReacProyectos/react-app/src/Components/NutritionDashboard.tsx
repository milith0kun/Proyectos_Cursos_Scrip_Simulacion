import "./NutritionDashboard.css";
import DataTable from "./DataTable";
import {
  DietInfo,
  Recipe,
  HealthArticle,
  MentalHealthTip,
} from "../types/nutrition.types";
import { useState, useEffect } from "react";

type NutritionDashboardProps = {
  diets: DietInfo[];
  recipes: Recipe[];
  articles: HealthArticle[];
  mentalHealthTips: MentalHealthTip[];
  onContactSubmit: (data: ContactForm) => void;
};

function NutritionDashboard({
  diets,
  recipes,
  articles,
  mentalHealthTips,
  onContactSubmit,
}: NutritionDashboardProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Control del scroll para el header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="nutrition-dashboard">
      <header
        className={`nutrition-header ${!isHeaderVisible ? "hidden" : ""}`}
      >
        <h1>Nutrición Holística</h1>
        <nav className="navbar">
          <ul>
            <li>
              <a href="#about">Acerca de</a>
            </li>
            <li>
              <a href="#specific-diets">Dietas Específicas</a>
            </li>
            <li>
              <a href="#mental-health">Salud Mental</a>
            </li>
            <li>
              <a href="#healthy-recipes">Recetas Saludables</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>
        </nav>
      </header>

      <section id="main-image" className="hero-section">
        <div className="hero-content">
          <h2>Bienvenido a la Nutrición Holística</h2>
          <p>Optimiza tu salud con alimentación consciente.</p>
        </div>
      </section>

      <section id="specific-diets" className="horizontal-sections">
        <h2>Dietas Específicas</h2>
        <div className="section-content">
          <DataTable
            columns={[
              { key: "title", title: "Dieta" },
              { key: "description", title: "Descripción" },
            ]}
            data={diets}
            onRowClick={(diet) => (window.location.href = diet.url)}
          />
        </div>
      </section>

      <section id="mental-health" className="full-screen">
        <div className="content-wrapper">
          <h2>Salud Mental y Alimentación</h2>
          <div className="tips-grid">
            {mentalHealthTips.map((tip) => (
              <article key={tip.id} className="tip-card">
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
                <div className="related-foods">
                  <h4>Alimentos Recomendados:</h4>
                  <ul>
                    {tip.relatedFoods.map((food, index) => (
                      <li key={index}>{food}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="healthy-recipes" className="recipes-section">
        <h2>Recetas Saludables</h2>
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <article key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div className="nutritional-info">
                <span>Calorías: {recipe.nutritionalInfo.calories}</span>
                <span>Proteínas: {recipe.nutritionalInfo.protein}</span>
                <span>Carbos: {recipe.nutritionalInfo.carbs}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Contacto</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onContactSubmit({
              name: formData.get("name") as string,
              email: formData.get("email") as string,
              message: formData.get("message") as string,
            });
          }}
        >
          <div className="form-group">
            <label htmlFor="name">Tu Nombre:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Tu Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Tu Mensaje:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}

export default NutritionDashboard;
