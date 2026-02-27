import { useState, ReactNode } from "react";
import { Search, Filter, Download, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  onAdd?: () => void;
  addLabel?: string;
  onExport?: () => void;
  rowKey: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function DataTable<T>({
  title,
  subtitle,
  columns,
  data,
  searchPlaceholder = "Buscar...",
  searchKeys = [],
  onAdd,
  addLabel = "Nuevo",
  onExport,
  rowKey,
  onRowClick,
  emptyMessage = "No se encontraron resultados",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? data.filter((item) =>
        searchKeys.some((key) =>
          String(item[key] ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      )
    : data;

  const alignClass = (align?: string) =>
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          {onExport && (
            <Button variant="outline" className="gap-2" onClick={onExport}>
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          )}
          {onAdd && (
            <Button className="gap-2" onClick={onAdd}>
              <Plus className="h-4 w-4" />
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Table */}
      <Card className="animate-fade-in">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-xs text-muted-foreground">
                  {columns.map((col) => (
                    <th key={col.key} className={`px-4 py-3 font-medium ${alignClass(col.align)}`}>
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr
                      key={rowKey(item)}
                      className="border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors"
                      onClick={() => onRowClick?.(item)}
                    >
                      {columns.map((col) => (
                        <td key={col.key} className={`px-4 py-3 ${alignClass(col.align)}`}>
                          {col.render(item)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
