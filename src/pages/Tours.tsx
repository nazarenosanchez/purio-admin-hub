import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, LayoutGrid, List, MapPin, Users, Clock, Plus, Star, MoreHorizontal, Pencil, Eye, Trash2, Mountain, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, Column } from "@/components/shared/DataTable";
import { mockTours } from "@/data/mock-data";
import type { Tour } from "@/types/database.types";

const estadoStyles: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactivo: "bg-gray-50 text-gray-500 border-gray-200",
  borrador: "bg-amber-50 text-amber-700 border-amber-200",
};

const dificultadIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  facil: { icon: <Zap className="h-3 w-3" />, color: "text-emerald-600" },
  moderada: { icon: <Mountain className="h-3 w-3" />, color: "text-amber-600" },
  dificil: { icon: <Mountain className="h-3 w-3" />, color: "text-red-600" },
};

const columns: Column<Tour>[] = [
  {
    key: "codigo",
    header: "Código",
    render: (t) => <span className="font-mono text-xs font-medium text-[#3D3B6E]">{t.tourCodigo}</span>,
  },
  {
    key: "nombre",
    header: "Tour",
    render: (t) => (
      <div className="min-w-0">
        <p className="font-semibold text-sm truncate">{t.tourNombre}</p>
        {t.tourDescripcionCorta && (
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{t.tourDescripcionCorta}</p>
        )}
      </div>
    ),
  },
  {
    key: "ciudad",
    header: "Ubicación",
    render: (t) => <span className="text-muted-foreground text-sm">{t.tourCiudad}</span>,
  },
  { key: "duracion", header: "Duración", render: (t) => <span className="text-sm">{t.tourDuracion}</span> },
  {
    key: "capacidad",
    header: "Capacidad",
    align: "center",
    render: (t) => <span className="text-sm">{t.tourCapacidadMinima}-{t.tourCapacidadMaxima} pax</span>,
  },
  {
    key: "precio",
    header: "Precio",
    align: "right",
    render: (t) =>
      t.tourPrecioBase ? (
        <span className="font-semibold text-sm">S/ {t.tourPrecioBase}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    key: "estado",
    header: "Estado",
    render: (t) => (
      <Badge variant="outline" className={`text-xs ${estadoStyles[t.tourEstado]}`}>
        <span className="capitalize">{t.tourEstado}</span>
      </Badge>
    ),
  },
];

export default function Tours() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tours</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockTours.length} tours en catálogo
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => navigate('/tours/nuevo')}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Tour
          </Button>
        </div>
      </div>

      {/* Vista Grid */}
      {viewMode === 'grid' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockTours.map((tour) => {
            const dif = dificultadIcons[tour.tourDificultad] || dificultadIcons.facil;
            return (
              <Card
                key={tour.tourId}
                className="group hover:shadow-md transition-all duration-200 cursor-pointer border overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Header compacto con gradiente */}
                  <div className="relative h-28 bg-gradient-to-br from-[#3D3B6E] to-[#5B5891] flex items-end p-4">
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <Badge variant="outline" className={`text-[10px] px-2 py-0 ${estadoStyles[tour.tourEstado]} bg-white/90 backdrop-blur-sm`}>
                        {tour.tourEstado}
                      </Badge>
                      {tour.tourDestacado && (
                        <div className="h-5 w-5 rounded-full bg-amber-400/90 flex items-center justify-center">
                          <Star className="h-3 w-3 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-white">
                      <div className="text-[10px] font-mono opacity-70">{tour.tourCodigo}</div>
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                        {tour.tourNombre}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3">
                    {tour.tourDescripcionCorta && (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {tour.tourDescripcionCorta}
                      </p>
                    )}

                    {/* Tags de info */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {tour.tourCiudad}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        <Clock className="h-3 w-3" />
                        {tour.tourDuracion}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        <Users className="h-3 w-3" />
                        {tour.tourCapacidadMaxima} pax
                      </span>
                      {tour.tourDificultad && (
                        <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-gray-100 ${dif.color}`}>
                          {dif.icon}
                          {tour.tourDificultad}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      {tour.tourPrecioBase ? (
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Desde</div>
                          <div className="text-lg font-bold text-[#3D3B6E]">S/ {tour.tourPrecioBase}</div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Sin precio</span>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Vista Lista */}
      {viewMode === 'list' && (
        <DataTable
          title="Lista de Tours"
          columns={columns}
          data={mockTours}
          searchPlaceholder="Buscar por nombre o código..."
          searchKeys={["tourNombre", "tourCodigo"]}
          rowKey={(t) => t.tourId}
        />
      )}
    </div>
  );
}
