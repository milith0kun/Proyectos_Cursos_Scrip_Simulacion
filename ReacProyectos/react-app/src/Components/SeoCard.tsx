import "./SeoCard.css";
import { SeoMetrics, SeoAnalysis, CompetitorData } from "../types/seo.types";

type SeoCardProps = {
  metrics: SeoMetrics;
  analysis: SeoAnalysis;
  competitors: CompetitorData[];
  onAnalyze?: (url: string) => void;
};

const DEFAULT_METRICS: SeoMetrics = {
  id: 1,
  keyword: "marketing digital",
  searchVolume: 12000,
  difficulty: 67,
  position: 4,
  traffic: 850,
};

function SeoCard({
  metrics = DEFAULT_METRICS,
  analysis,
  competitors,
  onAnalyze,
}: SeoCardProps) {
  return (
    <div className="seo-card">
      <div className="metrics-section">
        <h3>Métricas Clave</h3>
        <div className="metric-item">
          <span>Palabra Clave:</span>
          <strong>{metrics.keyword}</strong>
        </div>
        <div className="metric-item">
          <span>Volumen de Búsqueda:</span>
          <strong>{metrics.searchVolume}</strong>
        </div>
        <div className="metric-item">
          <span>Dificultad:</span>
          <strong>{metrics.difficulty}%</strong>
        </div>
      </div>

      <div className="analysis-section">
        <h3>Análisis de Página</h3>
        <button
          className="analyze-btn"
          onClick={() => onAnalyze?.(analysis.url)}
        >
          Analizar de nuevo
        </button>
        <div className="analysis-item">
          <span>Título SEO:</span>
          <p>{analysis.title}</p>
        </div>
        <div className="analysis-item">
          <span>Descripción:</span>
          <p>{analysis.description}</p>
        </div>
        <div className="analysis-item">
          <span>Palabras:</span>
          <strong>{analysis.wordCount}</strong>
        </div>
      </div>

      <div className="competitors-section">
        <h3>Competidores</h3>
        <ul className="competitors-list">
          {competitors.map((competitor) => (
            <li key={competitor.id} className="competitor-item">
              <span>{competitor.domain}</span>
              <div className="competitor-metrics">
                <span>DA: {competitor.authority}</span>
                <span>Enlaces: {competitor.backlinks}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SeoCard;
