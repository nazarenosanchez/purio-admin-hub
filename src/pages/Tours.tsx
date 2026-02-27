import { useState } from "react";
import { Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, Column } from "@/components/shared/DataTable";
import { FormDialog } from "@/components/shared/FormDialog";
import { mockTours } from "@/data/mock-data";
import type { Tour } from "@/types/database.types";

const estadoStyles: Record<string, string> = {
  activo: "bg-success/15 text-success border-success/20",
  inactivo: "bg-muted text-muted-foreground border-muted",
  borrador: "bg-warning/15 text-warning border-warning/20",
};

const columns: Column<Tour>[] = [
  {
    key: "codigo",
    header: "Código",
    render: (t) => <span className="font-medium font-heading text-xs">{t.tourCodigo}</span>,
  },
  {
    key: "nombre",
    header: "Tour",
    render: (t) => (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Map className="h-3.5 w-3.5" />
        </div>
        <div>
          <p className="font-medium text-sm">{t.tourNombre}</p>
          {t.tourDescripcionCorta && (
            <p className="text-xs text-muted-foreground line-clamp-1">{t.tourDescripcionCorta}</p>
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
        <span className="font-bold font-heading text-primary">S/ {t.tourPrecioBase}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    key: "estado",
    header: "Estado",
    render: (t) => (
      <Badge variant="outline" className={estadoStyles[t.tourEstado]}>
        {t.tourEstado}
      </Badge>
    ),
  },
];

export default function Tours() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = () => {
    // TODO: integrate with backend
    setDialogOpen(false);
  };

  return (
    <>
      <DataTable
        title="Tours"
        subtitle="Gestiona tu catálogo de tours"
        columns={columns}
        data={mockTours}
        searchPlaceholder="Buscar por nombre o código..."
        searchKeys={["tourNombre", "tourCodigo"]}
        onAdd={() => setDialogOpen(true)}
        addLabel="Nuevo Tour"
        rowKey={(t) => t.tourId}
      />

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
    </>
  );
}
