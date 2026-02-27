import { useState } from "react";
import { Map, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockTours } from "@/data/mock-data";

const estadoStyles: Record<string, string> = {
  activo: "bg-success/15 text-success border-success/20",
  inactivo: "bg-muted text-muted-foreground border-muted",
  borrador: "bg-warning/15 text-warning border-warning/20",
};

export default function Tours() {
  const [search, setSearch] = useState("");
  const filtered = mockTours.filter(
    (t) =>
      t.tourNombre.toLowerCase().includes(search.toLowerCase()) ||
      t.tourCodigo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Tours</h1>
          <p className="text-sm text-muted-foreground">Gestiona tu catálogo de tours</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Tour
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o código..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tour) => (
          <Card key={tour.tourId} className="group cursor-pointer transition-shadow hover:shadow-md animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Map className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-heading leading-tight">{tour.tourNombre}</CardTitle>
                    <p className="text-xs text-muted-foreground">{tour.tourCodigo}</p>
                  </div>
                </div>
                <Badge variant="outline" className={estadoStyles[tour.tourEstado]}>
                  {tour.tourEstado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tour.tourDescripcionCorta && (
                <p className="text-xs text-muted-foreground line-clamp-2">{tour.tourDescripcionCorta}</p>
              )}
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {tour.tourCiudad}, {tour.tourPais}
                </span>
                <span className="font-medium">{tour.tourDuracion}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs text-muted-foreground">
                  Cap: {tour.tourCapacidadMinima}-{tour.tourCapacidadMaxima}
                </span>
                {tour.tourPrecioBase && (
                  <span className="text-sm font-bold font-heading text-primary">
                    S/ {tour.tourPrecioBase}
                  </span>
                )}
              </div>
              {tour.tourDestacado && (
                <Badge className="bg-accent/15 text-accent border-accent/20 text-[10px]" variant="outline">
                  ⭐ Destacado
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
