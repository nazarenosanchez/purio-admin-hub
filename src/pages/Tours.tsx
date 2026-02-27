import { useState } from "react";
import { Map, LayoutGrid, List, MapPin, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, Column } from "@/components/shared/DataTable";
import { FormDialog } from "@/components/shared/FormDialog";
import { mockTours } from "@/data/mock-data";
import type { Tour } from "@/types/database.types";

const estadoStyles: Record<string, string> = {
  activo: "bg-success/10 text-success-foreground border-0",
  inactivo: "bg-muted text-muted-foreground border-0",
  borrador: "bg-warning/10 text-warning-foreground border-0",
};

const columns: Column<Tour>[] = [
  {
    key: "codigo",
    header: "Código",
    render: (t) => <span className="font-mono text-xs font-medium">{t.tourCodigo}</span>,
  },
  {
    key: "nombre",
    header: "Tour",
    render: (t) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
          <Map className="h-4 w-4" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{t.tourNombre}</p>
          {t.tourDescripcionCorta && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{t.tourDescripcionCorta}</p>
          )}
        </div>
      </div>
    ),
  },
  {
    key: "ciudad",
    header: "Ubicación",
    render: (t) => <span className="text-muted-foreground">{t.tourCiudad}, {t.tourPais}</span>,
  },
  { key: "duracion", header: "Duración", render: (t) => t.tourDuracion },
  {
    key: "capacidad",
    header: "Capacidad",
    align: "center",
    render: (t) => `${t.tourCapacidadMinima}-${t.tourCapacidadMaxima}`,
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
      <Badge variant="outline" className={estadoStyles[t.tourEstado]}>
        <span className="capitalize">{t.tourEstado}</span>
      </Badge>
    ),
  },
];

export default function Tours() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSubmit = () => {
    // TODO: integrate with backend
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header con toggle de vista */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tours</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestiona tu catálogo de tours</p>
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
          <Button onClick={() => setDialogOpen(true)}>
            Nuevo Tour
          </Button>
        </div>
      </div>

      {/* Vista de Grid (Cards) */}
      {viewMode === 'grid' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockTours.map((tour) => (
            <Card key={tour.tourId} className="group hover:shadow-lg transition-all duration-200 cursor-pointer border">
              <CardContent className="p-0">
                {/* Imagen placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                  <Map className="h-16 w-16 text-primary/30" strokeWidth={1.5} />
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className={estadoStyles[tour.tourEstado]}>
                      <span className="capitalize">{tour.tourEstado}</span>
                    </Badge>
                  </div>
                </div>
                
                {/* Contenido */}
                <div className="p-5 space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {tour.tourNombre}
                      </h3>
                    </div>
                    {tour.tourDescripcionCorta && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tour.tourDescripcionCorta}
                      </p>
                    )}
                  </div>

                  {/* Info del tour */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{tour.tourCiudad}, {tour.tourPais}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{tour.tourDuracion}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{tour.tourCapacidadMinima}-{tour.tourCapacidadMaxima} pax</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer con precio */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xs text-muted-foreground font-mono">{tour.tourCodigo}</span>
                    {tour.tourPrecioBase ? (
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Desde</div>
                        <div className="text-xl font-bold text-primary">S/ {tour.tourPrecioBase}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Vista de Lista */}
      {viewMode === 'list' && (
        <DataTable
          columns={columns}
          data={mockTours}
          searchPlaceholder="Buscar por nombre o código..."
          searchKeys={["tourNombre", "tourCodigo"]}
          rowKey={(t) => t.tourId}
        />
      )}

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Nuevo Tour"
        description="Completa los datos del tour para agregarlo al catálogo."
        onSubmit={handleSubmit}
        size="lg"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tourCodigo">Código</Label>
            <Input id="tourCodigo" placeholder="TUR-007" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tourNombre">Nombre</Label>
            <Input id="tourNombre" placeholder="Nombre del tour" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tourCiudad">Ciudad</Label>
            <Input id="tourCiudad" placeholder="Cusco" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tourPais">País</Label>
            <Input id="tourPais" placeholder="Perú" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tourDuracion">Duración</Label>
            <Input id="tourDuracion" placeholder="2 días" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tourEstado">Estado</Label>
            <Select defaultValue="borrador">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="borrador">Borrador</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tourCapMin">Capacidad mínima</Label>
            <Input id="tourCapMin" type="number" placeholder="2" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tourCapMax">Capacidad máxima</Label>
            <Input id="tourCapMax" type="number" placeholder="30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tourPrecio">Precio base (S/)</Label>
            <Input id="tourPrecio" type="number" placeholder="350" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tourDificultad">Dificultad</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facil">Fácil</SelectItem>
                <SelectItem value="moderado">Moderado</SelectItem>
                <SelectItem value="dificil">Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tourDesc">Descripción corta</Label>
          <Textarea id="tourDesc" placeholder="Breve descripción del tour..." rows={3} />
        </div>
      </FormDialog>
    </div>
  );
}
