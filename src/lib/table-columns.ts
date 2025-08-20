// Dummy table columns for template - replace with actual implementations
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export const transactionColumns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'date', label: 'Date', sortable: true }
];

export const userColumns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: false },
  { key: 'status', label: 'Status', sortable: false }
];

export const terminalColumns: TableColumn[] = [
  { key: 'id', label: 'Terminal ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'location', label: 'Location', sortable: false },
  { key: 'status', label: 'Status', sortable: false }
];

// Default column renderer
export function renderCell(item: any, column: TableColumn) {
  return item[column.key] || '-';
}

export default {
  transactionColumns,
  userColumns,
  terminalColumns,
  renderCell
};