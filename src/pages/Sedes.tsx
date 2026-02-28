import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building, Plus, Mail, Phone, MapPin, Star, Users,
  Map, Search, MoreHorizontal, LayoutGrid, List,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data: todas las sedes pertenecen al operador activo (single-tenant)
const mockSedes = [
  {
    sedeId: 1,
    sedeCodigo: "CUSCO-01",
    sedeNombre: "Sede Central Cusco",
    sedeCiudad: "Cusco",
    sedePais: "Perú",
    sedeDireccion: "Av. El Sol 123, Oficina 301",
    sedeTelefono: "+51 984 123 456",
    sedeEmail: "cusco@puriotravel.pe",
    sedeEsPrincipal: true,
    sedeEstado: "activo",
    totalUsuarios: 8,
    totalTours: 18,
    totalSalidasMes: 42,
  },
  {
    sedeId: 2,
    sedeCodigo: "LIMA-01",
    sedeNombre: "Oficina Lima",
    sedeCiudad: "Lima",
    sedePais: "Perú",
    sedeDireccion: "Av. Larco 1234, Miraflores",
    sedeTelefono: "+51 976 543 210",
    sedeEmail: "lima@puriotravel.pe",
    sedeEsPrincipal: false,
    sedeEstado: "activo",
    totalUsuarios: 4,
    totalTours: 6,
    totalSalidasMes: 15,
  },
  {
    sedeId: 3,
    sedeCodigo: "AQP-01",
    sedeNombre: "Sucursal Arequipa",
    sedeCiudad: "Arequipa",
    sedePais: "Perú",
    sedeDireccion: "Calle Mercaderes 210",
    sedeTelefono: "+51 965 432 109",
    sedeEmail: "arequipa@puriotravel.pe",
    sedeEsPrincipal: false,
    sedeEstado: "inactivo",
    totalUsuarios: 2,
    totalTours: 4,
    totalSalidasMes: 0,
  },
];

const estadoStyles: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactivo: "bg-gray-50 text-gray-500 border-gray-200",
};

export default function Sedes() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string | null>(null);

  const sedesFiltradas = mockSedes.filter((sede) => {
    const matchBusqueda =
      busqueda === "" ||
      sede.sedeNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      sede.sedeCodigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      sede.sedeCiudad.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === null || sede.sedeEstado === filtroEstado;
    return matchBusqueda && matchEstado;
  });

  const totalActivas = mockSedes.filter((s) => s.sedeEstado === "activo").length;
  const totalUsuarios = mockSedes.reduce((acc, s) => acc + s.totalUsuarios, 0);
  const totalTours = mockSedes.reduce((acc, s) => acc + s.totalTours, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sedes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sucursales y locales de tu operación
          </p>
        </div>
        <Button onClick={() => navigate("/sedes/nueva")}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Sede
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white border rounded-xl">
          <div className="text-2xl font-bold text-[#3D3B6E]">{mockSedes.length}</div>
          <div className="text-xs text-muted-foreground">Total sedes</div>
        </div>
        <div className="p-4 bg-white border rounded-xl">
          <div className="text-2xl font-bold text-emerald-600">{totalActivas}</div>
          <div className="text-xs text-muted-foreground">Activas</div>
        </div>
        <div className="p-4 bg-white border rounded-xl">
          <div className="text-2xl font-bold text-[#3D3B6E]">{totalUsuarios}</div>
          <div className="text-xs text-muted-foreground">Usuarios total</div>
        </div>
        <div className="p-4 bg-white border rounded-xl">
          <div className="text-2xl font-bold text-[#3D3B6E]">{totalTours}</div>
          <div className="text-xs text-muted-foreground">Tours total</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, código o ciudad..."
            className="pl-9"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant={filtroEstado === null ? "default" : "outline"} size="sm" onClick={() => setFiltroEstado(null)}>
            Todas
          </Button>
          <Button variant={filtroEstado === "activo" ? "default" : "outline"} size="sm" onClick={() => setFiltroEstado("activo")}>
            Activas
          </Button>
          <Button variant={filtroEstado === "inactivo" ? "default" : "outline"} size="sm" onClick={() => setFiltroEstado("inactivo")}>
            Inactivas
          </Button>
        </div>
      </div>

      {/* Grid de sedes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sedesFiltradas.map((sede) => (
          <Card
            key={sede.sedeId}
            className="group hover:shadow-md transition-all duration-200 cursor-pointer border overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Barra superior de estado */}
              <div className={`h-1.5 ${sede.sedeEstado === "activo" ? "bg-emerald-500" : "bg-gray-300"}`} />

              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-[#E8E7F5] flex items-center justify-center shrink-0">
                      <Building className="h-5 w-5 text-[#3D3B6E]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm truncate">{sede.sedeNombre}</h3>
                        {sede.sedeEsPrincipal && (
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{sede.sedeCodigo}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] px-2 py-0 ${estadoStyles[sede.sedeEstado]}`}>
                    {sede.sedeEstado}
                  </Badge>
                </div>

                {/* Info de contacto */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{sede.sedeDireccion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3 shrink-0" />
                    <span className="truncate">{sede.sedeEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3 shrink-0" />
                    <span>{sede.sedeTelefono}</span>
                  </div>
                </div>

                {/* Ubicación badge */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    <MapPin className="h-3 w-3" />
                    {sede.sedeCiudad}, {sede.sedePais}
                  </span>
                  {sede.sedeEsPrincipal && (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                      <Star className="h-3 w-3" />
                      Principal
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-[#3D3B6E]">{sede.totalUsuarios}</div>
                    <div className="text-[10px] text-muted-foreground">Usuarios</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-[#3D3B6E]">{sede.totalTours}</div>
                    <div className="text-[10px] text-muted-foreground">Tours</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-[#3D3B6E]">{sede.totalSalidasMes}</div>
                    <div className="text-[10px] text-muted-foreground">Salidas/mes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sedesFiltradas.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No se encontraron sedes</p>
        </div>
      )}
    </div>
  );
}
