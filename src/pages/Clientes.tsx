import { useState } from "react";
import { Users, Mail, Phone, MapPin, Calendar, Plus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDialog } from "@/components/shared/FormDialog";

// Mock data
const mockClientes = [
  {
    clienteId: 1,
    clienteNombre: "Juan",
    clienteApellido: "Pérez García",
    clienteEmail: "juan.perez@email.com",
    clienteTelefono: "+51 987 654 321",
    clientePais: "Perú",
    clienteCiudad: "Lima",
    clienteTipoDocumento: "DNI",
    clienteNumeroDocumento: "12345678",
    totalReservas: 5,
    totalGastado: 2450,
    ultimaReserva: "2026-02-15",
    estado: "activo",
  },
  {
    clienteId: 2,
    clienteNombre: "María",
    clienteApellido: "González López",
    clienteEmail: "maria.gonzalez@email.com",
    clienteTelefono: "+51 998 765 432",
    clientePais: "Perú",
    clienteCiudad: "Cusco",
    clienteTipoDocumento: "DNI",
    clienteNumeroDocumento: "87654321",
    totalReservas: 3,
    totalGastado: 1680,
    ultimaReserva: "2026-03-01",
    estado: "activo",
  },
  {
    clienteId: 3,
    clienteNombre: "Carlos",
    clienteApellido: "Rodríguez Silva",
    clienteEmail: "carlos.rodriguez@email.com",
    clienteTelefono: "+51 976 543 210",
    clientePais: "Perú",
    clienteCiudad: "Arequipa",
    clienteTipoDocumento: "DNI",
    clienteNumeroDocumento: "45678912",
    totalReservas: 8,
    totalGastado: 4200,
    ultimaReserva: "2026-02-28",
    estado: "vip",
  },
  {
    clienteId: 4,
    clienteNombre: "Ana",
    clienteApellido: "Martínez Torres",
    clienteEmail: "ana.martinez@email.com",
    clienteTelefono: "+51 965 432 109",
    clientePais: "Perú",
    clienteCiudad: "Trujillo",
    clienteTipoDocumento: "DNI",
    clienteNumeroDocumento: "78945612",
    totalReservas: 1,
    totalGastado: 450,
    ultimaReserva: "2026-01-20",
    estado: "activo",
  },
];

const estadoStyles: Record<string, string> = {
  activo: "bg-success/10 text-success border-0",
  vip: "bg-warning/10 text-warning border-0",
  inactivo: "bg-muted text-muted-foreground border-0",
};

export default function Clientes() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = () => {
    setDialogOpen(false);
  };

  const filteredClientes = mockClientes.filter(
    (cliente) =>
      cliente.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.clienteApellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.clienteEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestiona tu base de clientes y su historial
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, apellido o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grid de clientes */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredClientes.map((cliente) => (
          <Card
            key={cliente.clienteId}
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer border"
          >
            <CardContent className="p-5 space-y-4">
              {/* Header con avatar y estado */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg font-semibold">
                      {cliente.clienteNombre.charAt(0)}
                      {cliente.clienteApellido.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                      {cliente.clienteNombre} {cliente.clienteApellido}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {cliente.clienteTipoDocumento}: {cliente.clienteNumeroDocumento}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={estadoStyles[cliente.estado]}>
                  <span className="capitalize">{cliente.estado}</span>
                </Badge>
              </div>

              {/* Información de contacto */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{cliente.clienteEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{cliente.clienteTelefono}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>
                    {cliente.clienteCiudad}, {cliente.clientePais}
                  </span>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                <div>
                  <div className="text-xs text-muted-foreground">Reservas</div>
                  <div className="text-lg font-bold text-primary">
                    {cliente.totalReservas}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Total gastado</div>
                  <div className="text-lg font-bold text-primary">
                    S/ {cliente.totalGastado.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Última reserva */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  Última reserva:{" "}
                  {new Date(cliente.ultimaReserva).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para nuevo cliente */}
      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Nuevo Cliente"
        description="Completa los datos del cliente para agregarlo al sistema."
        onSubmit={handleSubmit}
        size="lg"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="clienteNombre">Nombre</Label>
            <Input id="clienteNombre" placeholder="Juan" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clienteApellido">Apellido</Label>
            <Input id="clienteApellido" placeholder="Pérez García" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clienteEmail">Email</Label>
            <Input id="clienteEmail" type="email" placeholder="cliente@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clienteTelefono">Teléfono</Label>
            <Input id="clienteTelefono" placeholder="+51 987 654 321" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clienteTipoDocumento">Tipo de Documento</Label>
            <Input id="clienteTipoDocumento" placeholder="DNI" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clienteNumeroDocumento">Número de Documento</Label>
            <Input id="clienteNumeroDocumento" placeholder="12345678" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientePais">País</Label>
            <Input id="clientePais" placeholder="Perú" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clienteCiudad">Ciudad</Label>
            <Input id="clienteCiudad" placeholder="Lima" />
          </div>
        </div>
      </FormDialog>
    </div>
  );
}
