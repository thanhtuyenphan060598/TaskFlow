import type { ReactNode } from "react";

export type TableColumn<T> = {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
};

export type TableProps<T extends Record<string, unknown>> = {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  className?: string;
};

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  getRowKey,
  className = "",
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto rounded-md border border-border ${className}`}>
      <table className="w-full border-collapse text-sm text-text">
        <thead className="bg-secondary text-left">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-button-x py-button-y font-medium">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={getRowKey(row)} className="border-t border-border">
              {columns.map((column) => (
                <td key={column.key} className="px-button-x py-button-y">
                  {column.render ? column.render(row) : String(row[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
