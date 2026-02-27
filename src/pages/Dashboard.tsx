import { BookOpen, DollarSign, Map, Users, TrendingUp, XCircle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDashboardStats, mockRevenueData, mockTourPopularity, mockReservas } from "@/data/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";

const estadoBadge: Record<string, string> = {
  pendiente_pago: "bg-warning/15 text-warning border-warning/20",
  confirmada: "bg-info/15 text-info border-info/20",
  completada: "bg-success/15 text-success border-success/20",
  cancelada: "bg-destructive/15 text-destructive border-destructive/20",
};

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-8">
      {/* Header con mejor jerarquía */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Resumen general de operaciones en tiempo real</p>
      </div>

      {/* KPI Cards con mejor espaciado */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Reservas del mes" value={stats.reservasEsteMes} icon={BookOpen} trend={{ value: 12, positive: true }} variant="accent" />
        <StatCard title="Ingresos del mes" value={`S/ ${stats.ingresosMes.toLocaleString()}`} icon={DollarSign} trend={{ value: 8, positive: true }} variant="success" />
        <StatCard title="Tours activos" value={stats.toursActivos} icon={Map} variant="default" />
        <StatCard title="Ocupación promedio" value={`${stats.ocupacionPromedio}%`} icon={TrendingUp} trend={{ value: 5, positive: true }} variant="warning" />
      </div>

      {/* Gráficos con diseño más sofisticado */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 animate-fade-in border shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Ingresos mensuales</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Últimos 6 meses</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(187 100% 42%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(187 100% 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fontSize: 12, fill: 'hsl(0 0% 45%)' }} 
                  axisLine={{ stroke: 'hsl(0 0% 90%)' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'hsl(0 0% 45%)' }} 
                  axisLine={{ stroke: 'hsl(0 0% 90%)' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid hsl(0 0% 90%)', 
                    fontSize: 12,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number) => [`S/ ${value.toLocaleString()}`, 'Ingresos']}
                />
                <Area type="monotone" dataKey="ingresos" stroke="hsl(187 100% 42%)" fill="url(#colorIngresos)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 animate-fade-in border shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Tours populares</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Por cantidad de reservas</p>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockTourPopularity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" strokeOpacity={0.5} />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 11, fill: 'hsl(0 0% 45%)' }} 
                  axisLine={{ stroke: 'hsl(0 0% 90%)' }}
                  tickLine={false}
                />
                <YAxis 
                  dataKey="nombre" 
                  type="category" 
                  tick={{ fontSize: 11, fill: 'hsl(0 0% 45%)' }} 
                  width={100} 
                  axisLine={{ stroke: 'hsl(0 0% 90%)' }}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid hsl(0 0% 90%)', 
                    fontSize: 12,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar dataKey="reservas" fill="hsl(258 90% 66%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla estilo Linear - más elegante */}
      <Card className="animate-fade-in border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Reservas recientes</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Últimas 5 reservas registradas</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Código</th>
                  <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Cliente</th>
                  <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Tour</th>
                  <th className="pb-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wide">Total</th>
                  <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Estado</th>
                  <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {mockReservas.slice(0, 5).map((r) => (
                  <tr 
                    key={r.reservaId} 
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors duration-150"
                  >
                    <td className="py-4">
                      <span className="font-mono text-xs font-medium">{r.reservaCodigo}</span>
                    </td>
                    <td className="py-4">
                      <span className="font-medium">{r.clienteNombre}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-muted-foreground">{r.tourNombre}</span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-semibold">S/ {r.reservaTotal.toLocaleString()}</span>
                    </td>
                    <td className="py-4">
                      <Badge 
                        variant="outline" 
                        className={`${estadoBadge[r.reservaEstado]} border-0`}
                      >
                        {r.reservaEstado.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <span className="text-muted-foreground text-xs">{r.reservaFechaReserva}</span>
                    </td>
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
