import "./KeywordAnalyzer.css";
import { KeywordData } from "../types/seo.types";

type KeywordAnalyzerProps = {
  data: KeywordData;
  onAnalyze?: (keyword: string) => void;
};

function KeywordAnalyzer({ data, onAnalyze }: KeywordAnalyzerProps) {
  return (
    <div className="keyword-analyzer">
      <h3>Análisis de Palabra Clave</h3>
      <div className="keyword-header">
        <h4>{data.keyword}</h4>
        <span className={`intent-badge ${data.intent}`}>{data.intent}</span>
      </div>
      <div className="keyword-metrics">
        <div className="metric">
          <span>CPC</span>
          <strong>${data.cpc}</strong>
        </div>
        <div className="metric">
          <span>Competencia</span>
          <strong>{data.competition}%</strong>
        </div>
      </div>
      <div className="related-keywords">
        <h5>Palabras Clave Relacionadas</h5>
        <div className="keyword-tags">
          {data.relatedKeywords.map((keyword, index) => (
            <span
              key={index}
              className="keyword-tag"
              onClick={() => onAnalyze?.(keyword)}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KeywordAnalyzer;
