import { useState } from "react";
import { BarChart3, Download, Calendar, TrendingUp, Users, DollarSign, Map, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data para reportes
const ventasPorMes = [
  { mes: "Ene", ventas: 45, ingresos: 18500 },
  { mes: "Feb", ventas: 52, ingresos: 21300 },
  { mes: "Mar", ventas: 38, ingresos: 15800 },
  { mes: "Abr", ventas: 61, ingresos: 24900 },
  { mes: "May", ventas: 48, ingresos: 19600 },
  { mes: "Jun", ventas: 55, ingresos: 22400 },
];

const toursMasVendidos = [
  { nombre: "Machu Picchu", reservas: 145, ingresos: 65250 },
  { nombre: "Valle Sagrado", reservas: 98, ingresos: 37240 },
  { nombre: "7 Colores", reservas: 87, ingresos: 27840 },
  { nombre: "Camino Inca", reservas: 52, ingresos: 39000 },
  { nombre: "City Tour", reservas: 76, ingresos: 13680 },
];

const reservasPorEstado = [
  { estado: "Confirmada", cantidad: 156, color: "#10b981" },
  { estado: "Pendiente", cantidad: 42, color: "#f59e0b" },
  { estado: "Completada", cantidad: 234, color: "#3b82f6" },
  { estado: "Cancelada", cantidad: 18, color: "#ef4444" },
];

const metodosPago = [
  { metodo: "Tarjeta", cantidad: 189, monto: 84500 },
  { metodo: "Transferencia", cantidad: 124, monto: 56200 },
  { metodo: "Yape/Plin", cantidad: 98, monto: 32400 },
  { metodo: "Efectivo", cantidad: 39, monto: 15600 },
];

export default function Reportes() {
  const [fechaInicio, setFechaInicio] = useState("2025-01-01");
  const [fechaFin, setFechaFin] = useState("2025-06-30");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Análisis y estadísticas del negocio
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Reporte
        </Button>
      </div>

      {/* Filtros de fecha */}
      <Card className="border">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="fechaInicio">Fecha Inicio</Label>
              <Input
                id="fechaInicio"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="fechaFin">Fecha Fin</Label>
              <Input
                id="fechaFin"
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
            <Button>Aplicar Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Resumen */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Total Ventas</p>
                <p className="text-2xl font-bold mt-1">299</p>
                <p className="text-xs text-success mt-1">+12% vs mes anterior</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Ingresos</p>
                <p className="text-2xl font-bold mt-1">S/ 127,900</p>
                <p className="text-xs text-success mt-1">+8% vs mes anterior</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Clientes</p>
                <p className="text-2xl font-bold mt-1">186</p>
                <p className="text-xs text-success mt-1">+15% nuevos</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Calificación</p>
                <p className="text-2xl font-bold mt-1">4.8</p>
                <p className="text-xs text-muted-foreground mt-1">Promedio general</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ventas por mes */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Ventas e Ingresos por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventasPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="ventas" fill="#404040" name="Ventas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ingresos" fill="#5DADE2" name="Ingresos (S/)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reservas por estado */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Reservas por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reservasPorEstado}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ estado, cantidad }) => `${estado}: ${cantidad}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="cantidad"
                >
                  {reservasPorEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tours más vendidos */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Tours Más Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {toursMasVendidos.map((tour, index) => (
              <div key={tour.nombre} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{tour.nombre}</span>
                    <span className="text-sm text-muted-foreground">
                      {tour.reservas} reservas
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-2 bg-muted rounded-full flex-1 mr-3 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(tour.reservas / toursMasVendidos[0].reservas) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      S/ {tour.ingresos.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métodos de pago */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Métodos de Pago</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metodosPago.map((metodo) => (
              <div key={metodo.metodo} className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">{metodo.metodo}</div>
                <div className="text-2xl font-bold text-primary mb-1">
                  S/ {metodo.monto.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metodo.cantidad} transacciones
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
