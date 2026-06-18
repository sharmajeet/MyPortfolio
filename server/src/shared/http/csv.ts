/** Minimal RFC-4180 CSV builder — quotes only the fields that need it. */
export function toCsv(rows: Record<string, unknown>[], columns: string[]): string {
  const escape = (value: unknown): string => {
    const text = value === null || value === undefined ? "" : String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const header = columns.join(",");
  const body = rows.map((row) => columns.map((column) => escape(row[column])).join(",")).join("\n");
  return `${header}\n${body}`;
}
