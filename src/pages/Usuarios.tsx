import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Plus, LayoutGrid, List, Shield, MapPin,
  Mail, Phone, Clock, MoreHorizontal, Search,
  UserCheck, UserX, UserCog,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock roles (schema: Roles)
const roles = [
  { rolId: 1, rolCodigo: "admin", rolNombre: "Administrador", color: "bg-[#3D3B6E] text-white" },
  { rolId: 2, rolCodigo: "vendedor", rolNombre: "Vendedor", color: "bg-amber-100 text-amber-800" },
  { rolId: 3, rolCodigo: "guia", rolNombre: "Guía", color: "bg-emerald-100 text-emerald-800" },
  { rolId: 4, rolCodigo: "contador", rolNombre: "Contador", color: "bg-blue-100 text-blue-800" },
];

// Mock usuarios (schema: UsuariosOperador + Roles + UsuarioSedes)
const mockUsuarios = [
  {
    usuarioId: 1,
    rolId: 1,
    usuarioEmail: "carlos@puriotravel.pe",
    usuarioNombre: "Carlos",
    usuarioApellido: "Mendoza",
    usuarioTelefono: "+51 984 555 111",
    usuarioDocumentoTipo: "DNI",
    usuarioDocumentoNumero: "70123456",
    usuarioEstado: "activo",
    usuarioUltimoAcceso: "2026-02-28T10:30:00",
    sedes: ["Sede Central Cusco", "Oficina Lima"],
    permisos: 24,
  },
  {
    usuarioId: 2,
    rolId: 2,
    usuarioEmail: "maria@puriotravel.pe",
    usuarioNombre: "María",
    usuarioApellido: "Quispe",
    usuarioTelefono: "+51 984 555 222",
    usuarioDocumentoTipo: "DNI",
    usuarioDocumentoNumero: "70234567",
    usuarioEstado: "activo",
    usuarioUltimoAcceso: "2026-02-27T16:45:00",
    sedes: ["Sede Central Cusco"],
    permisos: 12,
  },
  {
    usuarioId: 3,
    rolId: 3,
    usuarioEmail: "jorge@puriotravel.pe",
    usuarioNombre: "Jorge",
    usuarioApellido: "Huamán",
    usuarioTelefono: "+51 984 555 333",
    usuarioDocumentoTipo: "DNI",
    usuarioDocumentoNumero: "70345678",
    usuarioEstado: "activo",
    usuarioUltimoAcceso: "2026-02-26T08:15:00",
    sedes: ["Sede Central Cusco"],
    permisos: 8,
  },
  {
    usuarioId: 4,
    rolId: 2,
    usuarioEmail: "ana@puriotravel.pe",
    usuarioNombre: "Ana",
    usuarioApellido: "Torres",
    usuarioTelefono: "+51 984 555 444",
    usuarioDocumentoTipo: "CE",
    usuarioDocumentoNumero: "CE-001234",
    usuarioEstado: "activo",
    usuarioUltimoAcceso: "2026-02-28T09:00:00",
    sedes: ["Oficina Lima"],
    permisos: 12,
  },
  {
    usuarioId: 5,
    rolId: 3,
    usuarioEmail: "pedro@puriotravel.pe",
    usuarioNombre: "Pedro",
    usuarioApellido: "Vargas",
    usuarioTelefono: "+51 984 555 555",
    usuarioDocumentoTipo: "DNI",
    usuarioDocumentoNumero: "70456789",
    usuarioEstado: "inactivo",
    usuarioUltimoAcceso: "2026-01-15T14:20:00",
    sedes: ["Sucursal Arequipa"],
    permisos: 5,
  },
  {
    usuarioId: 6,
    rolId: 4,
    usuarioEmail: "lucia@puriotravel.pe",
    usuarioNombre: "Lucía",
    usuarioApellido: "Fernández",
    usuarioTelefono: "+51 984 555 666",
    usuarioDocumentoTipo: "DNI",
    usuarioDocumentoNumero: "70567890",
    usuarioEstado: "activo",
    usuarioUltimoAcceso: "2026-02-28T11:00:00",
    sedes: ["Sede Central Cusco", "Oficina Lima", "Sucursal Arequipa"],
    permisos: 6,
  },
];

const estadoConfig: Record<string, { label: string; badge: string; icon: React.ReactNode }> = {
  activo: { label: "Activo", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <UserCheck className="h-3 w-3" /> },
  inactivo: { label: "Inactivo", badge: "bg-gray-50 text-gray-500 border-gray-200", icon: <UserX className="h-3 w-3" /> },
};

export default function Usuarios() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtroRol, setFiltroRol] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const usuariosFiltrados = mockUsuarios.filter((u) => {
    const matchRol = filtroRol === null || u.rolId === filtroRol;
    const matchBusqueda =
      busqueda === "" ||
      `${u.usuarioNombre} ${u.usuarioApellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.usuarioEmail.toLowerCase().includes(busqueda.toLowerCase());
    return matchRol && matchBusqueda;
  });

  const getRol = (rolId: number) => roles.find((r) => r.rolId === rolId);

  const formatUltimoAcceso = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return "Hace minutos";
    if (diffHrs < 24) return `Hace ${diffHrs}h`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString("es-PE", { day: "2-digit", month: "short" });
  };

  const getInitials = (nombre: string, apellido: string) =>
    `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();

  // Stats
  const totalActivos = mockUsuarios.filter((u) => u.usuarioEstado === "activo").length;
  const totalInactivos = mockUsuarios.filter((u) => u.usuarioEstado === "inactivo").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockUsuarios.length} usuarios · {totalActivos} activos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="h-8">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8">
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => navigate("/usuarios/nuevo")}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {/* Stats rápidos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white border rounded-xl">
          <div className="text-2xl font-bold text-[#3D3B6E]">{mockUsuarios.length}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="p-4 bg-white border rounded-xl">
          <div className="text-2xl font-bold text-emerald-600">{totalActivos}</div>
          <div className="text-xs text-muted-foreground">Activos</div>
        </div>
        <div className="p-4 bg-white border rounded-xl">
          <div className="text-2xl font-bold text-gray-400">{totalInactivos}</div>
          <div className="text-xs text-muted-foreground">Inactivos</div>
        </div>
        <div className="p-4 bg-white border rounded-xl">
          <div className="text-2xl font-bold text-amber-600">{roles.length}</div>
          <div className="text-xs text-muted-foreground">Roles</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            className="pl-9"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filtroRol === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltroRol(null)}
          >
            Todos
          </Button>
          {roles.map((rol) => (
            <Button
              key={rol.rolId}
              variant={filtroRol === rol.rolId ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroRol(rol.rolId)}
            >
              {rol.rolNombre}
            </Button>
          ))}
        </div>
      </div>

      {/* Vista Grid */}
      {viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usuariosFiltrados.map((user) => {
            const rol = getRol(user.rolId);
            const est = estadoConfig[user.usuarioEstado];
            return (
              <Card key={user.usuarioId} className="group hover:shadow-md transition-all duration-200 cursor-pointer border overflow-hidden">
                <CardContent className="p-0">
                  {/* Header con gradiente según estado */}
                  <div className={`h-2 ${user.usuarioEstado === "activo" ? "bg-emerald-500" : "bg-gray-300"}`} />

                  <div className="p-5 space-y-4">
                    {/* Avatar + Info principal */}
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 bg-[#E8E7F5] text-[#3D3B6E] font-bold">
                        <AvatarFallback className="bg-[#E8E7F5] text-[#3D3B6E] font-bold text-sm">
                          {getInitials(user.usuarioNombre, user.usuarioApellido)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm truncate">
                            {user.usuarioNombre} {user.usuarioApellido}
                          </h3>
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 shrink-0 ${est.badge}`}>
                            {est.icon}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{user.usuarioEmail}</p>
                        {rol && (
                          <Badge className={`mt-1.5 text-[10px] px-2 py-0 ${rol.color} border-0`}>
                            {rol.rolNombre}
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Detalles */}
                    <div className="space-y-2">
                      {user.usuarioTelefono && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{user.usuarioTelefono}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{user.sedes.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Shield className="h-3 w-3" />
                        <span>{user.permisos} permisos asignados</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatUltimoAcceso(user.usuarioUltimoAcceso)}
                      </div>
                      <div className="flex gap-1">
                        {user.sedes.length > 1 && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {user.sedes.length} sedes
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Vista Lista */}
      {viewMode === "list" && (
        <Card className="border">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/50">
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Usuario</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Rol</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Sedes</th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">Permisos</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Estado</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Último acceso</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((user) => {
                  const rol = getRol(user.rolId);
                  const est = estadoConfig[user.usuarioEstado];
                  return (
                    <tr key={user.usuarioId} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[#E8E7F5] text-[#3D3B6E] font-bold text-xs">
                              {getInitials(user.usuarioNombre, user.usuarioApellido)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{user.usuarioNombre} {user.usuarioApellido}</div>
                            <div className="text-xs text-muted-foreground">{user.usuarioEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {rol && (
                          <Badge className={`text-[10px] px-2 py-0 ${rol.color} border-0`}>
                            {rol.rolNombre}
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">{user.sedes.join(", ")}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium">{user.permisos}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={`text-[10px] ${est.badge}`}>
                          {est.icon}
                          <span className="ml-1">{est.label}</span>
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground">{formatUltimoAcceso(user.usuarioUltimoAcceso)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {usuariosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No se encontraron usuarios</p>
        </div>
      )}
    </div>
  );
}
