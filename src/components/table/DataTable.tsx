type Column = {
  header: string;
  accessor: string;
};

type Props = {
  data: any[];
  columns: Column[];
  renderActions?: (row: any) => React.ReactNode;
};

const DataTable = ({ data, columns, renderActions }: Props) => {
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
              <td key={col.accessor}>{row[col.accessor]}</td>
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

export default DataTable;