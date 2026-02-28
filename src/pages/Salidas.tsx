import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, DollarSign, Clock, Plus, LayoutGrid, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data
const mockSalidas = [
  {
    salidaId: 1,
    tourNombre: "Machu Picchu Full Day",
    tourCiudad: "Cusco",
    salidaFecha: "2026-03-15",
    salidaHora: "05:00",
    cupoTotal: 30,
    cupoVendido: 18,
    cupoDisponible: 12,
    precioPorPersona: 450,
    estado: "confirmada",
  },
  {
    salidaId: 2,
    tourNombre: "Valle Sagrado + Maras",
    tourCiudad: "Cusco",
    salidaFecha: "2026-03-16",
    salidaHora: "08:00",
    cupoTotal: 25,
    cupoVendido: 25,
    cupoDisponible: 0,
    precioPorPersona: 380,
    estado: "agotado",
  },
  {
    salidaId: 3,
    tourNombre: "Montaña de 7 Colores",
    tourCiudad: "Cusco",
    salidaFecha: "2026-03-17",
    salidaHora: "04:30",
    cupoTotal: 20,
    cupoVendido: 8,
    cupoDisponible: 12,
    precioPorPersona: 320,
    estado: "confirmada",
  },
  {
    salidaId: 4,
    tourNombre: "City Tour Cusco",
    tourCiudad: "Cusco",
    salidaFecha: "2026-03-18",
    salidaHora: "14:00",
    cupoTotal: 15,
    cupoVendido: 3,
    cupoDisponible: 12,
    precioPorPersona: 180,
    estado: "disponible",
  },
  {
    salidaId: 5,
    tourNombre: "Laguna Humantay",
    tourCiudad: "Cusco",
    salidaFecha: "2026-03-19",
    salidaHora: "05:30",
    cupoTotal: 18,
    cupoVendido: 15,
    cupoDisponible: 3,
    precioPorPersona: 290,
    estado: "ultimos_cupos",
  },
];

const estadoStyles: Record<string, { badge: string; progress: string }> = {
  confirmada: {
    badge: "bg-success/10 text-success border-0",
    progress: "bg-success",
  },
  disponible: {
    badge: "bg-info/10 text-info border-0",
    progress: "bg-info",
  },
  ultimos_cupos: {
    badge: "bg-warning/10 text-warning border-0",
    progress: "bg-warning",
  },
  agotado: {
    badge: "bg-destructive/10 text-destructive border-0",
    progress: "bg-destructive",
  },
};

export default function Salidas() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'grid'>('calendar');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-PE', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    }).format(date);
  };

  const getOcupacionPercentage = (vendido: number, total: number) => {
    return Math.round((vendido / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Salidas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Programa y gestiona las salidas de tus tours
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className="h-8"
            >
              <CalendarDays className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => navigate('/salidas/nueva')}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Salida
          </Button>
        </div>
      </div>

      {/* Filtros rápidos - solo en vista grid */}
      {viewMode === 'grid' && (
        <div className="flex gap-2">
        <Button
          variant={selectedDate === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedDate(null)}
        >
          Todas
        </Button>
        <Button
          variant={selectedDate === "hoy" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedDate("hoy")}
        >
          Hoy
        </Button>
        <Button
          variant={selectedDate === "semana" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedDate("semana")}
        >
          Esta semana
        </Button>
        <Button
          variant={selectedDate === "mes" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedDate("mes")}
        >
          Este mes
        </Button>
        </div>
      )}

      {/* Vista Calendario */}
      {viewMode === 'calendar' && (
        <Card className="border">
          <CardContent className="p-6">
            {/* Header del calendario */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Hoy
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                  <h2 className="text-lg font-semibold">Marzo 2026</h2>
                  <Button variant="ghost" size="icon">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            {/* Grid del calendario */}
            <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
              {/* Headers de días */}
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="bg-muted p-3 text-center">
                  <span className="text-xs font-medium text-muted-foreground uppercase">{day}</span>
                </div>
              ))}

              {/* Días del mes */}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 2; // Ajustar para que el mes empiece en el día correcto
                const isCurrentMonth = dayNum > 0 && dayNum <= 31;
                const salida = mockSalidas.find(s => new Date(s.salidaFecha).getDate() === dayNum);

                return (
                  <div
                    key={i}
                    className={`bg-card p-2 min-h-[100px] ${
                      isCurrentMonth ? 'hover:bg-muted/50 cursor-pointer' : 'bg-muted/30'
                    } transition-colors`}
                  >
                    {isCurrentMonth && (
                      <>
                        <div className="text-sm font-medium mb-1">{dayNum}</div>
                        {salida && (
                          <div className="space-y-1">
                            <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded truncate">
                              {salida.salidaHora} - {salida.tourNombre}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {salida.cupoVendido}/{salida.cupoTotal} pax
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid de salidas */}
      {viewMode === 'grid' && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {mockSalidas.map((salida) => {
          const ocupacionPct = getOcupacionPercentage(salida.cupoVendido, salida.cupoTotal);
          
          return (
            <Card 
              key={salida.salidaId} 
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer border"
            >
              <CardContent className="p-5 space-y-4">
                {/* Header con fecha y estado */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-xs font-medium">
                        {new Date(salida.salidaFecha).toLocaleDateString('es-PE', { month: 'short' }).toUpperCase()}
                      </span>
                      <span className="text-lg font-bold">
                        {new Date(salida.salidaFecha).getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {formatDate(salida.salidaFecha)}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {salida.salidaHora}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={estadoStyles[salida.estado].badge}>
                    <span className="capitalize">{salida.estado.replace('_', ' ')}</span>
                  </Badge>
                </div>

                {/* Tour info */}
                <div>
                  <h3 className="font-semibold text-base line-clamp-2 mb-1">
                    {salida.tourNombre}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {salida.tourCiudad}
                  </div>
                </div>

                {/* Ocupación */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Ocupación</span>
                    </div>
                    <span className="font-semibold">
                      {salida.cupoVendido}/{salida.cupoTotal}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({ocupacionPct}%)
                      </span>
                    </span>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-300 rounded-full",
                        estadoStyles[salida.estado].progress
                      )}
                      style={{ width: `${ocupacionPct}%` }}
                    />
                  </div>
                  
                  {salida.cupoDisponible > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {salida.cupoDisponible} cupos disponibles
                    </div>
                  )}
                </div>

                {/* Precio */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>Precio</span>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    S/ {salida.precioPorPersona}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        </div>
      )}
    </div>
  );
}
