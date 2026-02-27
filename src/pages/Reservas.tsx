import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/shared/DataTable";
import { mockReservas } from "@/data/mock-data";
import type { Reserva } from "@/types/database.types";

const estadoBadge: Record<string, string> = {
  pendiente_pago: "bg-warning/15 text-warning border-warning/20",
  confirmada: "bg-info/15 text-info border-info/20",
  completada: "bg-success/15 text-success border-success/20",
  cancelada: "bg-destructive/15 text-destructive border-destructive/20",
};

const pagoBadge: Record<string, string> = {
  pendiente: "bg-warning/15 text-warning border-warning/20",
  adelanto_pagado: "bg-info/15 text-info border-info/20",
  pagado: "bg-success/15 text-success border-success/20",
  reembolsado: "bg-destructive/15 text-destructive border-destructive/20",
};

const columns: Column<Reserva>[] = [
  { key: "codigo", header: "Código", render: (r) => <span className="font-medium font-heading text-xs">{r.reservaCodigo}</span> },
  { key: "cliente", header: "Cliente", render: (r) => r.clienteNombre },
  { key: "tour", header: "Tour", render: (r) => <span className="text-muted-foreground">{r.tourNombre}</span> },
  { key: "pax", header: "Pax", align: "center", render: (r) => r.reservaCantidadTotal },
  { key: "total", header: "Total", align: "right", render: (r) => <span className="font-medium">S/ {r.reservaTotal.toLocaleString()}</span> },
  { key: "pagado", header: "Pagado", align: "right", render: (r) => <span className="font-medium text-success">S/ {r.reservaMontoPagado.toLocaleString()}</span> },
  { key: "estado", header: "Estado", render: (r) => <Badge variant="outline" className={estadoBadge[r.reservaEstado]}>{r.reservaEstado.replace("_", " ")}</Badge> },
  { key: "pago", header: "Pago", render: (r) => <Badge variant="outline" className={pagoBadge[r.reservaEstadoPago]}>{r.reservaEstadoPago.replace("_", " ")}</Badge> },
  { key: "origen", header: "Origen", render: (r) => <span className="text-xs text-muted-foreground capitalize">{r.reservaOrigen}</span> },
  { key: "fecha", header: "Fecha", render: (r) => <span className="text-muted-foreground">{r.reservaFechaReserva}</span> },
];

export default function Reservas() {
  return (
    <DataTable
      title="Reservas"
      subtitle="Gestiona las reservas de tus tours"
      columns={columns}
      data={mockReservas}
      searchPlaceholder="Buscar por código, cliente o tour..."
      searchKeys={["reservaCodigo", "clienteNombre", "tourNombre"]}
      onExport={() => {}}
      rowKey={(r) => r.reservaId}
    />
  );
}
