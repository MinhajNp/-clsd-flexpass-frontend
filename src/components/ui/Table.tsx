type Column = {
  header: string;
  accessor: string;
};

type Props = {
  data: Record<string, unknown>[];
  columns: Column[];
  renderActions?: (row: Record<string, unknown>) => React.ReactNode;
};

const Table = ({ data, columns, renderActions }: Props) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor}>{col.header}</th>
          ))}
          {renderActions && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col.accessor}>{String(row[col.accessor] ?? "")}</td>
            ))}

            {renderActions && (
              <td>{renderActions(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
