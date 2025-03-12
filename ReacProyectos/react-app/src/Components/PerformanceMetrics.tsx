import "./PerformanceMetrics.css";

type PerformanceData = {
  loadTime: {
    mobile: string;
    desktop: string;
  };
  performanceScore: number;
  firstContentfulPaint: string;
  speedIndex: string;
  largestContentfulPaint: string;
  timeToInteractive: string;
  totalBlockingTime: string;
  cumulativeLayoutShift: number;
};

type PerformanceMetricsProps = {
  data: PerformanceData;
  onOptimize?: () => void;
};

function PerformanceMetrics({ data, onOptimize }: PerformanceMetricsProps) {
  return (
    <div className="performance-card">
      <h3>Métricas de Rendimiento</h3>

      <div className="score-section">
        <div
          className="score-circle"
          style={{
            background: `conic-gradient(#4CAF50 ${
              data.performanceScore * 3.6
            }deg, #f0f0f0 0deg)`,
          }}
        >
          <span>{data.performanceScore}</span>
        </div>
        <p>Puntuación de Rendimiento</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-item">
          <span>Mobile</span>
          <strong>{data.loadTime.mobile}</strong>
        </div>
        <div className="metric-item">
          <span>Desktop</span>
          <strong>{data.loadTime.desktop}</strong>
        </div>
        <div className="metric-item">
          <span>FCP</span>
          <strong>{data.firstContentfulPaint}</strong>
        </div>
        <div className="metric-item">
          <span>TTI</span>
          <strong>{data.timeToInteractive}</strong>
        </div>
      </div>

      <button className="optimize-btn" onClick={onOptimize}>
        Optimizar Rendimiento
      </button>
    </div>
  );
}

export default PerformanceMetrics;
