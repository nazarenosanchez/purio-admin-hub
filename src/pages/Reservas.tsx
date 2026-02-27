import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/shared/DataTable";
import { mockReservas } from "@/data/mock-data";
import type { Reserva } from "@/types/database.types";

const estadoBadge: Record<string, string> = {
  pendiente_pago: "bg-warning/10 text-warning-foreground border-0",
  confirmada: "bg-info/10 text-info-foreground border-0",
  completada: "bg-success/10 text-success-foreground border-0",
  cancelada: "bg-destructive/10 text-destructive-foreground border-0",
};

const pagoBadge: Record<string, string> = {
  pendiente: "bg-warning/10 text-warning-foreground border-0",
  adelanto_pagado: "bg-info/10 text-info-foreground border-0",
  pagado: "bg-success/10 text-success-foreground border-0",
  reembolsado: "bg-destructive/10 text-destructive-foreground border-0",
};

const columns: Column<Reserva>[] = [
  { 
    key: "codigo", 
    header: "Código", 
    render: (r) => <span className="font-mono text-xs font-medium">{r.reservaCodigo}</span> 
  },
  { 
    key: "cliente", 
    header: "Cliente", 
    render: (r) => <span className="font-medium">{r.clienteNombre}</span>
  },
  { 
    key: "tour", 
    header: "Tour", 
    render: (r) => <span className="text-muted-foreground text-sm">{r.tourNombre}</span> 
  },
  { 
    key: "pax", 
    header: "Pax", 
    align: "center", 
    render: (r) => <span className="font-medium">{r.reservaCantidadTotal}</span>
  },
  { 
    key: "total", 
    header: "Total", 
    align: "right", 
    render: (r) => (
      <div className="text-right">
        <div className="font-semibold">S/ {r.reservaTotal.toLocaleString()}</div>
        <div className="text-xs text-success font-medium">S/ {r.reservaMontoPagado.toLocaleString()} pagado</div>
      </div>
    )
  },
  { 
    key: "estado", 
    header: "Estado", 
    render: (r) => (
      <Badge variant="outline" className={estadoBadge[r.reservaEstado]}>
        <span className="capitalize">{r.reservaEstado.replace("_", " ")}</span>
      </Badge>
    )
  },
  { 
    key: "pago", 
    header: "Estado Pago", 
    render: (r) => (
      <Badge variant="outline" className={pagoBadge[r.reservaEstadoPago]}>
        <span className="capitalize">{r.reservaEstadoPago.replace("_", " ")}</span>
      </Badge>
    )
  },
  { 
    key: "origen", 
    header: "Origen", 
    render: (r) => (
      <span className="text-xs text-muted-foreground capitalize px-2 py-1 bg-muted/50 rounded-md">
        {r.reservaOrigen}
      </span>
    )
  },
  { 
    key: "fecha", 
    header: "Fecha", 
    render: (r) => <span className="text-muted-foreground text-xs">{r.reservaFechaReserva}</span> 
  },
];

export default function Reservas() {
  return (
    <DataTable
      title="Reservas"
      subtitle="Gestiona y monitorea todas las reservas de tus tours"
      columns={columns}
      data={mockReservas}
      searchPlaceholder="Buscar por código, cliente o tour..."
      searchKeys={["reservaCodigo", "clienteNombre", "tourNombre"]}
      onExport={() => {}}
      rowKey={(r) => r.reservaId}
    />
  );
}
