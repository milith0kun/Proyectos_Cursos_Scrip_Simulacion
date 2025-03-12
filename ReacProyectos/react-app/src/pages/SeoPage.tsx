import "../pages/pages.css";
import SeoCard from "../Components/SeoCard";
import PerformanceMetrics from "../Components/PerformanceMetrics";
import { seoProps, performanceProps } from "../data/pageData";

function SeoPage() {
  return (
    <div className="seo-page">
      <h1>Análisis SEO</h1>
      <div className="seo-dashboard">
        <SeoCard {...seoProps} />
        <PerformanceMetrics {...performanceProps} />
      </div>
    </div>
  );
}

export default SeoPage;
