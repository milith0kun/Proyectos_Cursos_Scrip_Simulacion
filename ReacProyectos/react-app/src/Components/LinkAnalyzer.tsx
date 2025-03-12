import "./LinkAnalyzer.css";

type LinkData = {
  internal: {
    count: number;
    broken: number;
    valid: number;
  };
  external: {
    count: number;
    dofollow: number;
    nofollow: number;
  };
  anchors: {
    text: string;
    url: string;
    type: "internal" | "external";
  }[];
};

type LinkAnalyzerProps = {
  data: LinkData;
  onFixBroken?: () => void;
};

function LinkAnalyzer({ data, onFixBroken }: LinkAnalyzerProps) {
  return (
    <div className="link-analyzer">
      <h3>Análisis de Enlaces</h3>

      <div className="link-summary">
        <div className="summary-box">
          <h4>Enlaces Internos</h4>
          <div className="stats">
            <div className="stat">
              <span>Total</span>
              <strong>{data.internal.count}</strong>
            </div>
            <div className="stat error">
              <span>Rotos</span>
              <strong>{data.internal.broken}</strong>
            </div>
          </div>
        </div>

        <div className="summary-box">
          <h4>Enlaces Externos</h4>
          <div className="stats">
            <div className="stat">
              <span>Dofollow</span>
              <strong>{data.external.dofollow}</strong>
            </div>
            <div className="stat">
              <span>Nofollow</span>
              <strong>{data.external.nofollow}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="anchor-list">
        <h4>Textos Ancla</h4>
        {data.anchors.map((anchor, index) => (
          <div key={index} className={`anchor-item ${anchor.type}`}>
            <span className="anchor-text">{anchor.text}</span>
            <a href={anchor.url} target="_blank" rel="noopener noreferrer">
              {anchor.url}
            </a>
          </div>
        ))}
      </div>

      {data.internal.broken > 0 && (
        <button className="fix-btn" onClick={onFixBroken}>
          Reparar Enlaces Rotos ({data.internal.broken})
        </button>
      )}
    </div>
  );
}

export default LinkAnalyzer;
