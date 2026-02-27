import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockReservas } from "@/data/mock-data";

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

export default function Reservas() {
  const [search, setSearch] = useState("");
  const filtered = mockReservas.filter(
    (r) =>
      r.reservaCodigo.toLowerCase().includes(search.toLowerCase()) ||
      r.clienteNombre?.toLowerCase().includes(search.toLowerCase()) ||
      r.tourNombre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Reservas</h1>
          <p className="text-sm text-muted-foreground">Gestiona las reservas de tus tours</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por código, cliente o tour..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card className="animate-fade-in">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Código</th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Tour</th>
                  <th className="px-4 py-3 font-medium text-center">Pax</th>
                  <th className="px-4 py-3 font-medium text-right">Total</th>
                  <th className="px-4 py-3 font-medium text-right">Pagado</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Pago</th>
                  <th className="px-4 py-3 font-medium">Origen</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.reservaId} className="border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors">
                    <td className="px-4 py-3 font-medium font-heading text-xs">{r.reservaCodigo}</td>
                    <td className="px-4 py-3">{r.clienteNombre}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.tourNombre}</td>
                    <td className="px-4 py-3 text-center">{r.reservaCantidadTotal}</td>
                    <td className="px-4 py-3 text-right font-medium">S/ {r.reservaTotal.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-medium text-success">S/ {r.reservaMontoPagado.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={estadoBadge[r.reservaEstado]}>
                        {r.reservaEstado.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={pagoBadge[r.reservaEstadoPago]}>
                        {r.reservaEstadoPago.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground capitalize">{r.reservaOrigen}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{r.reservaFechaReserva}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
