import "./DataTable.css";

type TableColumn = {
  key: string;
  title: string;
};

type DataTableProps = {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (item: any) => void;
};

function DataTable({ columns, data, onRowClick }: DataTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => onRowClick?.(item)}>
              {columns.map((column) => (
                <td key={column.key}>{item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
