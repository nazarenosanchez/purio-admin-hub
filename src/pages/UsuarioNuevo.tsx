import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Save, ChevronRight, ChevronLeft,
  User, Shield, Building, Key,
  Plus, Trash2, Eye, EyeOff,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

const steps = [
  { id: "info", label: "Información", icon: User },
  { id: "rol", label: "Rol & Sedes", icon: Building },
  { id: "permisos", label: "Permisos", icon: Key },
  { id: "resumen", label: "Resumen", icon: Shield },
];

// Mock roles (schema: Roles)
const mockRoles = [
  { rolId: 1, rolCodigo: "admin", rolNombre: "Administrador", rolDescripcion: "Acceso total al sistema", rolEsSistema: true },
  { rolId: 2, rolCodigo: "vendedor", rolNombre: "Vendedor", rolDescripcion: "Gestión de reservas y ventas", rolEsSistema: true },
  { rolId: 3, rolCodigo: "guia", rolNombre: "Guía", rolDescripcion: "Acceso a tours y salidas asignadas", rolEsSistema: true },
  { rolId: 4, rolCodigo: "contador", rolNombre: "Contador", rolDescripcion: "Acceso a reportes y pagos", rolEsSistema: false },
];

// Mock sedes (schema: Sedes)
const mockSedes = [
  { sedeId: 1, sedeNombre: "Sede Central Cusco", sedeCiudad: "Cusco", sedeEsPrincipal: true },
  { sedeId: 2, sedeNombre: "Oficina Lima", sedeCiudad: "Lima", sedeEsPrincipal: false },
  { sedeId: 3, sedeNombre: "Sucursal Arequipa", sedeCiudad: "Arequipa", sedeEsPrincipal: false },
];

// Mock permisos agrupados por módulo (schema: Permisos)
const mockPermisos = [
  {
    modulo: "Tours",
    permisos: [
      { permisoId: 1, permisoCodigo: "tours.ver", permisoNombre: "Ver tours" },
      { permisoId: 2, permisoCodigo: "tours.crear", permisoNombre: "Crear tours" },
      { permisoId: 3, permisoCodigo: "tours.editar", permisoNombre: "Editar tours" },
      { permisoId: 4, permisoCodigo: "tours.eliminar", permisoNombre: "Eliminar tours" },
    ],
  },
  {
    modulo: "Salidas",
    permisos: [
      { permisoId: 5, permisoCodigo: "salidas.ver", permisoNombre: "Ver salidas" },
      { permisoId: 6, permisoCodigo: "salidas.crear", permisoNombre: "Crear salidas" },
      { permisoId: 7, permisoCodigo: "salidas.editar", permisoNombre: "Editar salidas" },
    ],
  },
  {
    modulo: "Reservas",
    permisos: [
      { permisoId: 8, permisoCodigo: "reservas.ver", permisoNombre: "Ver reservas" },
      { permisoId: 9, permisoCodigo: "reservas.crear", permisoNombre: "Crear reservas" },
      { permisoId: 10, permisoCodigo: "reservas.editar", permisoNombre: "Editar reservas" },
      { permisoId: 11, permisoCodigo: "reservas.cancelar", permisoNombre: "Cancelar reservas" },
    ],
  },
  {
    modulo: "Clientes",
    permisos: [
      { permisoId: 12, permisoCodigo: "clientes.ver", permisoNombre: "Ver clientes" },
      { permisoId: 13, permisoCodigo: "clientes.crear", permisoNombre: "Crear clientes" },
      { permisoId: 14, permisoCodigo: "clientes.editar", permisoNombre: "Editar clientes" },
    ],
  },
  {
    modulo: "Pagos",
    permisos: [
      { permisoId: 15, permisoCodigo: "pagos.ver", permisoNombre: "Ver pagos" },
      { permisoId: 16, permisoCodigo: "pagos.registrar", permisoNombre: "Registrar pagos" },
      { permisoId: 17, permisoCodigo: "pagos.reembolsar", permisoNombre: "Reembolsar pagos" },
    ],
  },
  {
    modulo: "Reportes",
    permisos: [
      { permisoId: 18, permisoCodigo: "reportes.ver", permisoNombre: "Ver reportes" },
      { permisoId: 19, permisoCodigo: "reportes.exportar", permisoNombre: "Exportar reportes" },
    ],
  },
  {
    modulo: "Configuración",
    permisos: [
      { permisoId: 20, permisoCodigo: "config.ver", permisoNombre: "Ver configuración" },
      { permisoId: 21, permisoCodigo: "config.editar", permisoNombre: "Editar configuración" },
      { permisoId: 22, permisoCodigo: "usuarios.ver", permisoNombre: "Ver usuarios" },
      { permisoId: 23, permisoCodigo: "usuarios.crear", permisoNombre: "Crear usuarios" },
      { permisoId: 24, permisoCodigo: "usuarios.editar", permisoNombre: "Editar permisos" },
    ],
  },
];

// Plantillas de permisos por rol (schema: RolPermisos)
const plantillasRol: Record<string, number[]> = {
  admin: mockPermisos.flatMap((m) => m.permisos.map((p) => p.permisoId)),
  vendedor: [1, 5, 6, 8, 9, 10, 12, 13, 15, 16, 18],
  guia: [1, 5, 8, 12],
  contador: [1, 5, 8, 15, 18, 19, 20],
};

export default function UsuarioNuevo() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1: Info personal (schema: UsuariosOperador)
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [docTipo, setDocTipo] = useState("DNI");
  const [docNumero, setDocNumero] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Rol & Sedes (schema: Roles + UsuarioSedes)
  const [rolSeleccionado, setRolSeleccionado] = useState<number | null>(null);
  const [sedesSeleccionadas, setSedesSeleccionadas] = useState<number[]>([]);
  const [sedePrincipal, setSedePrincipal] = useState<number | null>(null);

  // Step 3: Permisos (schema: UsuarioPermisos)
  const [permisosSeleccionados, setPermisosSeleccionados] = useState<number[]>([]);

  const rolInfo = mockRoles.find((r) => r.rolId === rolSeleccionado);

  const toggleSede = (sedeId: number) => {
    setSedesSeleccionadas((prev) => {
      const next = prev.includes(sedeId) ? prev.filter((id) => id !== sedeId) : [...prev, sedeId];
      if (!next.includes(sedePrincipal || 0)) setSedePrincipal(next[0] || null);
      return next;
    });
  };

  const togglePermiso = (permisoId: number) => {
    setPermisosSeleccionados((prev) =>
      prev.includes(permisoId) ? prev.filter((id) => id !== permisoId) : [...prev, permisoId]
    );
  };

  const toggleModulo = (modulo: typeof mockPermisos[0]) => {
    const ids = modulo.permisos.map((p) => p.permisoId);
    const allSelected = ids.every((id) => permisosSeleccionados.includes(id));
    if (allSelected) {
      setPermisosSeleccionados((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setPermisosSeleccionados((prev) => [...new Set([...prev, ...ids])]);
    }
  };

  const aplicarPlantilla = () => {
    if (rolInfo) {
      const plantilla = plantillasRol[rolInfo.rolCodigo] || [];
      setPermisosSeleccionados(plantilla);
    }
  };

  const totalPermisos = mockPermisos.reduce((acc, m) => acc + m.permisos.length, 0);

  const handleSave = () => {
    navigate("/usuarios");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/usuarios")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nuevo Usuario</h1>
            <p className="text-sm text-muted-foreground">Agrega un usuario al equipo del operador</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/usuarios")}>Cancelar</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Crear Usuario
          </Button>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isDone = index < currentStep;
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                ${isActive ? "bg-[#3D3B6E] text-white" : isDone ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}
              `}
            >
              <Icon className="h-4 w-4" />
              {step.label}
            </button>
          );
        })}
      </div>

      {/* ==================== STEP 0: Información Personal ==================== */}
      {currentStep === 0 && (
        <div className="max-w-2xl space-y-6">
          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Datos Personales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nombre *</Label>
                  <Input placeholder="Carlos" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Apellido *</Label>
                  <Input placeholder="Mendoza" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Correo Electrónico *</Label>
                <Input type="email" placeholder="carlos@puriotravel.pe" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input placeholder="+51 984 555 111" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tipo de Documento</Label>
                  <Select value={docTipo} onValueChange={setDocTipo}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DNI">DNI</SelectItem>
                      <SelectItem value="CE">Carnet de Extranjería</SelectItem>
                      <SelectItem value="PASAPORTE">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Número de Documento</Label>
                  <Input placeholder="70123456" value={docNumero} onChange={(e) => setDocNumero(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Acceso al Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Contraseña *</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password && (
                  <div className="flex gap-1 mt-1">
                    {[
                      password.length >= 8,
                      /[A-Z]/.test(password),
                      /[0-9]/.test(password),
                    ].map((ok, i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${ok ? "bg-emerald-500" : "bg-gray-200"}`} />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ==================== STEP 1: Rol & Sedes ==================== */}
      {currentStep === 1 && (
        <div className="max-w-3xl space-y-6">
          {/* Selección de Rol */}
          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Rol del Usuario</CardTitle>
              <p className="text-xs text-muted-foreground">El rol es indicativo. Los permisos reales se asignan en el siguiente paso.</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {mockRoles.map((rol) => (
                  <button
                    key={rol.rolId}
                    onClick={() => setRolSeleccionado(rol.rolId)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      rolSeleccionado === rol.rolId
                        ? "border-[#3D3B6E] bg-[#E8E7F5]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{rol.rolNombre}</h4>
                      {rol.rolEsSistema && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">Sistema</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{rol.rolDescripcion}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-mono">{rol.rolCodigo}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Asignación de Sedes */}
          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Sedes Asignadas</CardTitle>
              <p className="text-xs text-muted-foreground">
                Selecciona las sedes a las que tendrá acceso (schema: UsuarioSedes)
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSedes.map((sede) => {
                const isSelected = sedesSeleccionadas.includes(sede.sedeId);
                const isPrincipal = sedePrincipal === sede.sedeId;
                return (
                  <div
                    key={sede.sedeId}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      isSelected ? "border-[#3D3B6E] bg-[#E8E7F5]/50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSede(sede.sedeId)}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{sede.sedeNombre}</span>
                          {sede.sedeEsPrincipal && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-amber-50 text-amber-700 border-amber-200">
                              Sede principal
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{sede.sedeCiudad}</span>
                      </div>
                    </div>
                    {isSelected && sedesSeleccionadas.length > 1 && (
                      <Button
                        variant={isPrincipal ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setSedePrincipal(sede.sedeId)}
                      >
                        {isPrincipal ? "✓ Principal" : "Marcar principal"}
                      </Button>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ==================== STEP 2: Permisos ==================== */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Header de permisos */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {permisosSeleccionados.length} de {totalPermisos} permisos seleccionados
              </p>
            </div>
            <div className="flex gap-2">
              {rolInfo && (
                <Button variant="outline" size="sm" onClick={aplicarPlantilla}>
                  <Shield className="h-3.5 w-3.5 mr-2" />
                  Aplicar plantilla "{rolInfo.rolNombre}"
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (permisosSeleccionados.length === totalPermisos) {
                    setPermisosSeleccionados([]);
                  } else {
                    setPermisosSeleccionados(mockPermisos.flatMap((m) => m.permisos.map((p) => p.permisoId)));
                  }
                }}
              >
                {permisosSeleccionados.length === totalPermisos ? "Desmarcar todos" : "Seleccionar todos"}
              </Button>
            </div>
          </div>

          {/* Grid de módulos con permisos */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockPermisos.map((modulo) => {
              const moduloIds = modulo.permisos.map((p) => p.permisoId);
              const selectedCount = moduloIds.filter((id) => permisosSeleccionados.includes(id)).length;
              const allSelected = selectedCount === moduloIds.length;

              return (
                <Card key={modulo.modulo} className="border">
                  <CardHeader className="pb-2 px-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={() => toggleModulo(modulo)}
                        />
                        <CardTitle className="text-sm">{modulo.modulo}</CardTitle>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {selectedCount}/{moduloIds.length}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="space-y-2">
                      {modulo.permisos.map((permiso) => {
                        const isChecked = permisosSeleccionados.includes(permiso.permisoId);
                        return (
                          <label
                            key={permiso.permisoId}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                              isChecked ? "bg-[#E8E7F5]/50" : "hover:bg-gray-50"
                            }`}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => togglePermiso(permiso.permisoId)}
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-xs">{permiso.permisoNombre}</span>
                              <span className="block text-[10px] font-mono text-muted-foreground">{permiso.permisoCodigo}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== STEP 3: Resumen ==================== */}
      {currentStep === 3 && (
        <div className="max-w-2xl space-y-6">
          <Card className="border border-[#3D3B6E]/20 bg-[#E8E7F5]/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-[#3D3B6E]">Resumen del Nuevo Usuario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Info personal */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Información Personal</h4>
                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nombre</span>
                    <span className="font-medium">{nombre || "—"} {apellido || ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{email || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teléfono</span>
                    <span className="font-medium">{telefono || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Documento</span>
                    <span className="font-medium">{docTipo} {docNumero || "—"}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rol & Sedes</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rol</span>
                  <span className="font-medium">{rolInfo?.rolNombre || "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sedes</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {sedesSeleccionadas.length > 0 ? sedesSeleccionadas.map((id) => {
                      const sede = mockSedes.find((s) => s.sedeId === id);
                      return (
                        <Badge key={id} variant="outline" className="text-[10px]">
                          {sede?.sedeNombre}
                          {sedePrincipal === id && " ★"}
                        </Badge>
                      );
                    }) : <span className="text-sm font-medium">—</span>}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Permisos</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total permisos</span>
                  <span className="font-bold text-[#3D3B6E]">{permisosSeleccionados.length} de {totalPermisos}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mockPermisos.map((modulo) => {
                    const moduloIds = modulo.permisos.map((p) => p.permisoId);
                    const selectedCount = moduloIds.filter((id) => permisosSeleccionados.includes(id)).length;
                    if (selectedCount === 0) return null;
                    return (
                      <Badge
                        key={modulo.modulo}
                        variant="outline"
                        className={`text-[10px] ${
                          selectedCount === moduloIds.length
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {modulo.modulo}: {selectedCount}/{moduloIds.length}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navegación entre pasos */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Paso {currentStep + 1} de {steps.length}
        </span>
        {currentStep < steps.length - 1 ? (
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            Siguiente
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Crear Usuario
          </Button>
        )}
      </div>
    </div>
  );
}
