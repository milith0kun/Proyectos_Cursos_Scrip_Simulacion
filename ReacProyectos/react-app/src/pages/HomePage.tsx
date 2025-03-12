import { Link } from "react-router-dom";
import "../pages/pages.css";

function HomePage() {
  return (
    <div className="home-page">
      <h1>Bienvenido a Nutrición y SEO</h1>
      <section className="hero-section">
        <h2>Optimiza tu Presencia Digital</h2>
        <p>Descubre nuestras herramientas de SEO y consejos de nutrición</p>
      </section>
      <section className="features-section">
        <div className="feature-card">
          <h3>Análisis SEO</h3>
          <p>Mejora tu posicionamiento en buscadores</p>
          <Link to="/seo" className="feature-link">
            Ver análisis SEO
          </Link>
        </div>
        <div className="feature-card">
          <h3>Nutrición Holística</h3>
          <p>Consejos para una vida saludable</p>
          <Link to="/nutrition" className="feature-link">
            Ver nutrición
          </Link>
        </div>
         <div className="feature-card">
          <h3>Contacto</h3>
          <p>Contáctanos para más información</p>
          <Link to="/contact" className="feature-link">
            Ir a Contacto
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
