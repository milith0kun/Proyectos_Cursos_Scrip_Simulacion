import Card from "./Components/Card";
import List from "./Components/List";
import SeoCard from "./Components/SeoCard";
import PerformanceMetrics from "./Components/PerformanceMetrics";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";

import ContactPage from "./pages/ContactPage";
import NutritionPage from "./pages/NutritionPage";
import SeoPage from "./pages/SeoPage";

function App() {
  // Datos de ejemplo para SEO
  const seoData = {
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
      title: "Desarrollo Web con React",
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
  };

  const handleAnalyze = (url: string) => {
    console.log(`Analizando URL: ${url}`);
  };

  const handleOptimize = () => {
    console.log("Optimizando rendimiento...");
  };

  return (
    <Router>
      <div className="container">
        <header className="dashboard-header">
          <h1>Panel de Control SEO</h1>
          <p>Análisis y optimización de sitios web</p>
          <nav>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/contact">Contacto</Link>
              </li>
              <li>
                <Link to="/nutrition">Nutrición</Link>
              </li>
              <li>
                <Link to="/seo">SEO</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="dashboard-layout page-transition">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/seo" element={<SeoPage />} />
            {/* Add more routes as needed */}
          </Routes>
          <section className="metrics-section">
            <h2>Métricas Principales</h2>
            <div className="metrics-grid">
              <SeoCard
                metrics={seoData.metrics}
                analysis={seoData.analysis}
                competitors={seoData.competitors}
                onAnalyze={handleAnalyze}
              />
              <PerformanceMetrics
                data={{
                  loadTime: { mobile: "2.3s", desktop: "1.1s" },
                  performanceScore: 85,
                  firstContentfulPaint: "1.2s",
                  speedIndex: "2.1s",
                  largestContentfulPaint: "2.8s",
                  timeToInteractive: "3.2s",
                  totalBlockingTime: "150ms",
                  cumulativeLayoutShift: 0.1,
                }}
                onOptimize={handleOptimize}
              />
            </div>
          </section>

          <section className="analysis-section">
            <h2>Análisis Detallado</h2>
            <div className="analysis-grid">
              <Card onButtonClick={() => console.log("Card clicked")} />
              <List onItemClick={(item) => console.log("List item:", item)} />
            </div>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
