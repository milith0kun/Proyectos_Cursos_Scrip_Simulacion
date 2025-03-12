import "./List.css";

// Types
type ListItem = {
  id: number;
  text: string;
};

type ListProps = {
  items?: ListItem[];
  onItemClick?: (item: ListItem) => void;
};

// Constantes
const DEFAULT_ITEMS: ListItem[] = [
  { id: 1, text: "An item" },
  { id: 2, text: "A second item" },
  { id: 3, text: "A third item" },
  { id: 4, text: "A fourth item" },
  { id: 5, text: "And a fifth one" },
];

function List({ items = DEFAULT_ITEMS, onItemClick }: ListProps) {
  return (
    <div>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item.id}
            className="list-group-item"
            onClick={() => onItemClick?.(item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
