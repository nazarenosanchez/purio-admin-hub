import { useState } from "react";
import { Building2, Plus, Mail, Phone, MapPin, Globe, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDialog } from "@/components/shared/FormDialog";

// Mock data basado en tabla OperadoresTuristicos del DatabaseSchema.cs
const mockOperadores = [
  {
    operadorId: 1,
    operadorRazonSocial: "Purio Travel S.A.C.",
    operadorNombreComercial: "Purio Travel",
    operadorRuc: "20123456789",
    operadorEmail: "contacto@purio.pe",
    operadorTelefono: "+51 984 123 456",
    operadorDireccion: "Av. El Sol 123, Oficina 301",
    operadorCiudad: "Cusco",
    operadorPais: "Perú",
    operadorLogoUrl: "/logos/purio-logo.png",
    operadorSitioWeb: "https://www.purio.pe",
    operadorEstado: "activo",
    operadorFechaRegistro: "2024-01-15T10:00:00",
    totalSedes: 3,
    totalUsuarios: 12,
    totalTours: 24,
    createdAt: "2024-01-15T10:00:00",
    updatedAt: "2025-02-20T15:30:00",
  },
  {
    operadorId: 2,
    operadorRazonSocial: "Andes Explorer E.I.R.L.",
    operadorNombreComercial: "Andes Explorer",
    operadorRuc: "20987654321",
    operadorEmail: "info@andesexplorer.pe",
    operadorTelefono: "+51 976 543 210",
    operadorDireccion: "Jr. Triunfo 392, Centro Histórico",
    operadorCiudad: "Cusco",
    operadorPais: "Perú",
    operadorLogoUrl: null,
    operadorSitioWeb: "https://www.andesexplorer.pe",
    operadorEstado: "activo",
    operadorFechaRegistro: "2024-03-20T14:30:00",
    totalSedes: 2,
    totalUsuarios: 8,
    totalTours: 15,
    createdAt: "2024-03-20T14:30:00",
    updatedAt: "2025-02-18T11:20:00",
  },
  {
    operadorId: 3,
    operadorRazonSocial: "Peruvian Adventures S.R.L.",
    operadorNombreComercial: "Peruvian Adventures",
    operadorRuc: "20456789123",
    operadorEmail: "reservas@peruvianadventures.com",
    operadorTelefono: "+51 965 432 109",
    operadorDireccion: "Calle Plateros 334",
    operadorCiudad: "Cusco",
    operadorPais: "Perú",
    operadorLogoUrl: "/logos/peruvian-adventures.png",
    operadorSitioWeb: "https://www.peruvianadventures.com",
    operadorEstado: "inactivo",
    operadorFechaRegistro: "2023-11-10T09:15:00",
    totalSedes: 1,
    totalUsuarios: 5,
    totalTours: 8,
    createdAt: "2023-11-10T09:15:00",
    updatedAt: "2024-12-05T16:45:00",
  },
];

const estadoStyles: Record<string, string> = {
  activo: "bg-success/10 text-success border-0",
  inactivo: "bg-muted text-muted-foreground border-0",
  suspendido: "bg-destructive/10 text-destructive border-0",
};

export default function Operadores() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = () => {
    setDialogOpen(false);
  };

  const filteredOperadores = mockOperadores.filter(
    (op) =>
      op.operadorNombreComercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.operadorRazonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.operadorRuc.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operadores Turísticos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestiona las empresas operadoras en la plataforma (Multi-tenant)
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Operador
        </Button>
      </div>

      {/* Search */}
      <div>
        <Input
          placeholder="Buscar por nombre comercial, razón social o RUC..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Operadores Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredOperadores.map((operador) => (
          <Card
            key={operador.operadorId}
            className="border hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <CardContent className="p-5 space-y-4">
              {/* Header con logo */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {operador.operadorLogoUrl ? (
                      <img
                        src={operador.operadorLogoUrl}
                        alt={operador.operadorNombreComercial}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <Building2 className="h-7 w-7 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base truncate">
                      {operador.operadorNombreComercial}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {operador.operadorRazonSocial}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={estadoStyles[operador.operadorEstado]}>
                  <span className="capitalize">{operador.operadorEstado}</span>
                </Badge>
              </div>

              {/* RUC */}
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-xs text-muted-foreground">RUC:</span>
                <span className="text-sm font-mono font-semibold">{operador.operadorRuc}</span>
              </div>

              {/* Información de contacto */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{operador.operadorEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>{operador.operadorTelefono}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    {operador.operadorCiudad}, {operador.operadorPais}
                  </span>
                </div>
                {operador.operadorSitioWeb && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    <a
                      href={operador.operadorSitioWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:text-primary transition-colors"
                    >
                      {operador.operadorSitioWeb.replace("https://", "")}
                    </a>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{operador.totalSedes}</div>
                  <div className="text-xs text-muted-foreground">Sedes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{operador.totalUsuarios}</div>
                  <div className="text-xs text-muted-foreground">Usuarios</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{operador.totalTours}</div>
                  <div className="text-xs text-muted-foreground">Tours</div>
                </div>
              </div>

              {/* Fecha de registro */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t">
                <Calendar className="h-3 w-3" />
                <span>
                  Registrado:{" "}
                  {new Date(operador.operadorFechaRegistro).toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Detalles
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOperadores.length === 0 && (
        <Card className="border">
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No se encontraron operadores</p>
          </CardContent>
        </Card>
      )}

      {/* Dialog para nuevo operador */}
      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Nuevo Operador Turístico"
        description="Registra una nueva empresa operadora en la plataforma."
        onSubmit={handleSubmit}
        size="lg"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="operadorRazonSocial">Razón Social</Label>
            <Input id="operadorRazonSocial" placeholder="Purio Travel S.A.C." />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="operadorNombreComercial">Nombre Comercial</Label>
            <Input id="operadorNombreComercial" placeholder="Purio Travel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operadorRuc">RUC</Label>
            <Input id="operadorRuc" placeholder="20123456789" maxLength={11} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operadorTelefono">Teléfono</Label>
            <Input id="operadorTelefono" placeholder="+51 984 123 456" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="operadorEmail">Email</Label>
            <Input id="operadorEmail" type="email" placeholder="contacto@operador.pe" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="operadorDireccion">Dirección</Label>
            <Input id="operadorDireccion" placeholder="Av. Principal 123" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operadorCiudad">Ciudad</Label>
            <Input id="operadorCiudad" placeholder="Cusco" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operadorPais">País</Label>
            <Input id="operadorPais" placeholder="Perú" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="operadorSitioWeb">Sitio Web</Label>
            <Input id="operadorSitioWeb" placeholder="https://www.operador.pe" />
          </div>
        </div>
      </FormDialog>
    </div>
  );
}
