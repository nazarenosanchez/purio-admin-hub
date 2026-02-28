import { useState } from "react";
import { Ticket, Plus, Calendar, Percent, DollarSign, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDialog } from "@/components/shared/FormDialog";

// Mock data basado en tabla Cupones del DatabaseSchema.cs
const mockCupones = [
  {
    cuponId: 1,
    operadorId: 1,
    cuponCodigo: "VERANO2025",
    cuponDescripcion: "Descuento especial de verano",
    cuponTipo: "porcentaje",
    cuponValor: 15,
    cuponMontoMinimo: 200,
    cuponUsosMaximos: 100,
    cuponUsosActuales: 23,
    cuponFechaInicio: "2025-01-01",
    cuponFechaFin: "2025-03-31",
    cuponActivo: true,
    createdAt: "2024-12-15",
  },
  {
    cuponId: 2,
    operadorId: 1,
    cuponCodigo: "PRIMERAVEZ",
    cuponDescripcion: "Descuento para clientes nuevos",
    cuponTipo: "monto_fijo",
    cuponValor: 50,
    cuponMontoMinimo: 300,
    cuponUsosMaximos: 50,
    cuponUsosActuales: 12,
    cuponFechaInicio: "2025-01-01",
    cuponFechaFin: "2025-12-31",
    cuponActivo: true,
    createdAt: "2025-01-05",
  },
  {
    cuponId: 3,
    operadorId: 1,
    cuponCodigo: "MACHUPICCHU20",
    cuponDescripcion: "20% en tours a Machu Picchu",
    cuponTipo: "porcentaje",
    cuponValor: 20,
    cuponMontoMinimo: 400,
    cuponUsosMaximos: 30,
    cuponUsosActuales: 30,
    cuponFechaInicio: "2025-02-01",
    cuponFechaFin: "2025-02-28",
    cuponActivo: false,
    createdAt: "2025-01-20",
  },
  {
    cuponId: 4,
    operadorId: 1,
    cuponCodigo: "GRUPOAMIGOS",
    cuponDescripcion: "Descuento para grupos de 4 o más",
    cuponTipo: "porcentaje",
    cuponValor: 10,
    cuponMontoMinimo: 500,
    cuponUsosMaximos: 200,
    cuponUsosActuales: 45,
    cuponFechaInicio: "2025-01-15",
    cuponFechaFin: "2025-06-30",
    cuponActivo: true,
    createdAt: "2025-01-10",
  },
  {
    cuponId: 5,
    operadorId: 1,
    cuponCodigo: "EARLYBIRD",
    cuponDescripcion: "Reserva anticipada - 25% off",
    cuponTipo: "porcentaje",
    cuponValor: 25,
    cuponMontoMinimo: 600,
    cuponUsosMaximos: 20,
    cuponUsosActuales: 8,
    cuponFechaInicio: "2025-03-01",
    cuponFechaFin: "2025-03-15",
    cuponActivo: true,
    createdAt: "2025-02-20",
  },
];

const estadoStyles: Record<string, string> = {
  activo: "bg-success/10 text-success border-0",
  inactivo: "bg-muted text-muted-foreground border-0",
  agotado: "bg-destructive/10 text-destructive border-0",
};

export default function Cupones() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = () => {
    setDialogOpen(false);
  };

  const filteredCupones = mockCupones.filter((cupon) =>
    cupon.cuponCodigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cupon.cuponDescripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEstadoCupon = (cupon: typeof mockCupones[0]) => {
    if (!cupon.cuponActivo) return "inactivo";
    if (cupon.cuponUsosActuales >= cupon.cuponUsosMaximos) return "agotado";
    return "activo";
  };

  const getUsagePercentage = (actual: number, maximo: number) => {
    return Math.round((actual / maximo) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cupones</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestiona cupones de descuento para tus tours
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cupón
        </Button>
      </div>

      {/* Search */}
      <div>
        <Input
          placeholder="Buscar por código o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cupones Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredCupones.map((cupon) => {
          const estado = getEstadoCupon(cupon);
          const usagePercentage = getUsagePercentage(cupon.cuponUsosActuales, cupon.cuponUsosMaximos);

          return (
            <Card key={cupon.cuponId} className="border hover:shadow-lg transition-all duration-200">
              <CardContent className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Ticket className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{cupon.cuponCodigo}</h3>
                      <p className="text-xs text-muted-foreground">
                        {cupon.cuponDescripcion}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={estadoStyles[estado]}>
                    <span className="capitalize">{estado}</span>
                  </Badge>
                </div>

                {/* Descuento */}
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  {cupon.cuponTipo === "porcentaje" ? (
                    <>
                      <Percent className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {cupon.cuponValor}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          de descuento
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <DollarSign className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          S/ {cupon.cuponValor}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          de descuento
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Detalles */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monto mínimo:</span>
                    <span className="font-semibold">S/ {cupon.cuponMontoMinimo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Vigencia:</span>
                    <span className="font-semibold text-xs">
                      {new Date(cupon.cuponFechaInicio).toLocaleDateString("es-PE", { day: "2-digit", month: "short" })}
                      {" - "}
                      {new Date(cupon.cuponFechaFin).toLocaleDateString("es-PE", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                </div>

                {/* Uso */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>Usos</span>
                    </div>
                    <span className="font-semibold">
                      {cupon.cuponUsosActuales}/{cupon.cuponUsosMaximos}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({usagePercentage}%)
                      </span>
                    </span>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        usagePercentage >= 100 ? 'bg-destructive' : 
                        usagePercentage >= 80 ? 'bg-warning' : 
                        'bg-success'
                      }`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button 
                    variant={cupon.cuponActivo ? "outline" : "default"} 
                    size="sm" 
                    className="flex-1"
                  >
                    {cupon.cuponActivo ? "Desactivar" : "Activar"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dialog para nuevo cupón */}
      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Nuevo Cupón"
        description="Crea un nuevo cupón de descuento para tus tours."
        onSubmit={handleSubmit}
        size="lg"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="cuponCodigo">Código del Cupón</Label>
            <Input id="cuponCodigo" placeholder="VERANO2025" className="uppercase" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="cuponDescripcion">Descripción</Label>
            <Input id="cuponDescripcion" placeholder="Descuento especial de verano" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuponTipo">Tipo de Descuento</Label>
            <Input id="cuponTipo" placeholder="porcentaje / monto_fijo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuponValor">Valor</Label>
            <Input id="cuponValor" type="number" placeholder="15" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuponMontoMinimo">Monto Mínimo</Label>
            <Input id="cuponMontoMinimo" type="number" placeholder="200" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuponUsosMaximos">Usos Máximos</Label>
            <Input id="cuponUsosMaximos" type="number" placeholder="100" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuponFechaInicio">Fecha Inicio</Label>
            <Input id="cuponFechaInicio" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuponFechaFin">Fecha Fin</Label>
            <Input id="cuponFechaFin" type="date" />
          </div>
        </div>
      </FormDialog>
    </div>
  );
}
