import "./Card.css";

// Types
type CardItem = {
  id: number;
  title: string;
  text: string;
  buttonText: string;
  onButtonClick?: () => void;
  imageUrl?: string;
  subtitle?: string;
  footerText?: string;
};

type CardProps = {
  item?: CardItem;
  onButtonClick?: (item: CardItem) => void;
};

// Constantes
const DEFAULT_CARD: CardItem = {
  id: 1,
  title: "Card title",
  text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  buttonText: "Go somewhere",
};

// Componentes
function CardBody({
  title,
  text,
  buttonText,
  onButtonClick,
  imageUrl,
  subtitle,
  footerText,
}: CardItem) {
  return (
    <>
      {imageUrl && <img src={imageUrl} className="card-img-top" alt={title} />}
      <h5 className="card-title">{title}</h5>
      {subtitle && (
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
      )}
      <p className="card-text">{text}</p>
      <a href="#" className="btn btn-primary" onClick={onButtonClick}>
        {buttonText}
      </a>
      {footerText && <div className="card-footer text-muted">{footerText}</div>}
    </>
  );
}

function Card({ item = DEFAULT_CARD, onButtonClick }: CardProps) {
  return (
    <div className="card custom-card">
      <div className="card-body">
        <CardBody {...item} onButtonClick={() => onButtonClick?.(item)} />
      </div>
    </div>
  );
}

export default Card;
