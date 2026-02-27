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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Resumen general de operaciones</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Reservas del mes" value={stats.reservasEsteMes} icon={BookOpen} trend={{ value: 12, positive: true }} variant="accent" />
        <StatCard title="Ingresos del mes" value={`S/ ${stats.ingresosMes.toLocaleString()}`} icon={DollarSign} trend={{ value: 8, positive: true }} variant="success" />
        <StatCard title="Tours activos" value={stats.toursActivos} icon={Map} variant="default" />
        <StatCard title="Ocupación promedio" value={`${stats.ocupacionPromedio}%`} icon={TrendingUp} trend={{ value: 5, positive: true }} variant="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-base font-heading">Ingresos mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(187 100% 42%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(187 100% 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 10% 90%)" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(0 0% 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0 0% 45%)" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid hsl(240 10% 90%)', fontSize: 12 }}
                  formatter={(value: number) => [`S/ ${value.toLocaleString()}`, 'Ingresos']}
                />
                <Area type="monotone" dataKey="ingresos" stroke="hsl(187 100% 42%)" fill="url(#colorIngresos)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-base font-heading">Tours populares</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockTourPopularity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 10% 90%)" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(0 0% 45%)" />
                <YAxis dataKey="nombre" type="category" tick={{ fontSize: 11 }} width={90} stroke="hsl(0 0% 45%)" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(240 10% 90%)', fontSize: 12 }} />
                <Bar dataKey="reservas" fill="hsl(241 30% 33%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-base font-heading">Reservas recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">Código</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Tour</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {mockReservas.slice(0, 5).map((r) => (
                  <tr key={r.reservaId} className="border-b last:border-0">
                    <td className="py-3 font-medium font-heading text-xs">{r.reservaCodigo}</td>
                    <td className="py-3">{r.clienteNombre}</td>
                    <td className="py-3 text-muted-foreground">{r.tourNombre}</td>
                    <td className="py-3 font-medium">S/ {r.reservaTotal.toLocaleString()}</td>
                    <td className="py-3">
                      <Badge variant="outline" className={estadoBadge[r.reservaEstado]}>
                        {r.reservaEstado.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{r.reservaFechaReserva}</td>
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
