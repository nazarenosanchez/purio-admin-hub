import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Save, ChevronRight, ChevronLeft,
  Building, MapPin, Phone, FileText, Star,
  Mail, Globe, Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const steps = [
  { id: "info", label: "Información", icon: Building },
  { id: "contacto", label: "Contacto", icon: Phone },
  { id: "facturacion", label: "Facturación", icon: Receipt },
  { id: "resumen", label: "Resumen", icon: FileText },
];

export default function SedeNueva() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1: Info básica (schema: Sedes)
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("Perú");
  const [direccion, setDireccion] = useState("");
  const [esPrincipal, setEsPrincipal] = useState(false);
  const [estado, setEstado] = useState("activo");

  // Step 2: Contacto (schema: Sedes)
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  // Step 3: Facturación (schema: ConfiguracionFacturacionSede)
  const [factActiva, setFactActiva] = useState(false);
  const [factRuc, setFactRuc] = useState("");
  const [factRazonSocial, setFactRazonSocial] = useState("");
  const [factNombreComercial, setFactNombreComercial] = useState("");
  const [factDireccionFiscal, setFactDireccionFiscal] = useState("");
  const [factUbigeo, setFactUbigeo] = useState("");
  const [factPorcentajeImpuesto, setFactPorcentajeImpuesto] = useState("18");
  const [factModoProduccion, setFactModoProduccion] = useState(false);

  const handleSave = () => {
    navigate("/sedes");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/sedes")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nueva Sede</h1>
            <p className="text-sm text-muted-foreground">Registra una nueva sucursal de tu operación</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/sedes")}>Cancelar</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Crear Sede
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

      {/* ==================== STEP 0: Información Básica ==================== */}
      {currentStep === 0 && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#3D3B6E]" />
                  Datos de la Sede
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Código de Sede *</Label>
                    <Input
                      placeholder="CUSCO-01"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                      className="uppercase font-mono"
                    />
                    <p className="text-[10px] text-muted-foreground">Identificador único, ej: CIUDAD-##</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Nombre de la Sede *</Label>
                    <Input
                      placeholder="Sede Central Cusco"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Ciudad *</Label>
                    <Input placeholder="Cusco" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>País *</Label>
                    <Input placeholder="Perú" value={pais} onChange={(e) => setPais(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dirección Completa *</Label>
                  <Input
                    placeholder="Av. El Sol 123, Oficina 301"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select value={estado} onValueChange={setEstado}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div>
                    <Label className="text-sm">Sede Principal</Label>
                    <p className="text-[10px] text-muted-foreground">Sede por defecto del operador</p>
                  </div>
                  <Switch checked={esPrincipal} onCheckedChange={setEsPrincipal} />
                </div>
                {esPrincipal && (
                  <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded">
                    Al marcar como principal, la sede actual principal será reemplazada.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ==================== STEP 1: Contacto ==================== */}
      {currentStep === 1 && (
        <div className="max-w-2xl space-y-6">
          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#3D3B6E]" />
                Información de Contacto
              </CardTitle>
              <p className="text-xs text-muted-foreground">Datos de contacto de la sede para clientes y equipo interno</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="+51 984 123 456"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email de la Sede</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="cusco@puriotravel.pe"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {(nombre || codigo) && (
            <Card className="border bg-[#E8E7F5]/20">
              <CardContent className="p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Vista previa de la sede</h4>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#3D3B6E] flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{nombre || "Nombre de sede"}</h3>
                      {esPrincipal && <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />}
                    </div>
                    <p className="text-xs font-mono text-muted-foreground">{codigo || "CÓDIGO"}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      {ciudad && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {ciudad}, {pais}
                        </span>
                      )}
                      {telefono && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {telefono}
                        </span>
                      )}
                      {email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ==================== STEP 2: Facturación ==================== */}
      {currentStep === 2 && (
        <div className="max-w-2xl space-y-6">
          <Card className="border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-[#3D3B6E]" />
                    Facturación Electrónica
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Configuración de comprobantes electrónicos para esta sede</p>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs">Activar</Label>
                  <Switch checked={factActiva} onCheckedChange={setFactActiva} />
                </div>
              </div>
            </CardHeader>

            {factActiva ? (
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>RUC *</Label>
                    <Input placeholder="20123456789" value={factRuc} onChange={(e) => setFactRuc(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Razón Social *</Label>
                    <Input placeholder="Purio Travel S.A.C." value={factRazonSocial} onChange={(e) => setFactRazonSocial(e.target.value)} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nombre Comercial</Label>
                    <Input placeholder="Purio Travel" value={factNombreComercial} onChange={(e) => setFactNombreComercial(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Ubigeo</Label>
                    <Input placeholder="080101" value={factUbigeo} onChange={(e) => setFactUbigeo(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Dirección Fiscal *</Label>
                  <Input placeholder="Av. El Sol 123, Cusco" value={factDireccionFiscal} onChange={(e) => setFactDireccionFiscal(e.target.value)} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>% Impuesto (IGV)</Label>
                    <Input
                      type="number"
                      placeholder="18"
                      value={factPorcentajeImpuesto}
                      onChange={(e) => setFactPorcentajeImpuesto(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label className="text-sm">Modo Producción</Label>
                      <p className="text-[10px] text-muted-foreground">SUNAT producción real</p>
                    </div>
                    <Switch checked={factModoProduccion} onCheckedChange={setFactModoProduccion} />
                  </div>
                </div>

                {!factModoProduccion && (
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="text-xs text-amber-700">
                      Modo pruebas activo. Los comprobantes se enviarán al entorno beta de SUNAT.
                    </span>
                  </div>
                )}
              </CardContent>
            ) : (
              <CardContent>
                <div className="text-center py-8">
                  <Receipt className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Facturación desactivada para esta sede</p>
                  <p className="text-xs text-muted-foreground mt-1">Activa el switch para configurar la emisión de comprobantes</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}

      {/* ==================== STEP 3: Resumen ==================== */}
      {currentStep === 3 && (
        <div className="max-w-2xl space-y-6">
          <Card className="border border-[#3D3B6E]/20 bg-[#E8E7F5]/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-[#3D3B6E]">Resumen de la Nueva Sede</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Info */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Información General</h4>
                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Código</span>
                    <span className="font-mono font-medium">{codigo || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nombre</span>
                    <span className="font-medium">{nombre || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ciudad</span>
                    <span className="font-medium">{ciudad || "—"}, {pais}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estado</span>
                    <Badge variant="outline" className={`text-[10px] ${estadoStyles[estado]}`}>
                      {estado}
                    </Badge>
                  </div>
                  <div className="flex justify-between sm:col-span-2">
                    <span className="text-muted-foreground">Dirección</span>
                    <span className="font-medium text-right">{direccion || "—"}</span>
                  </div>
                  {esPrincipal && (
                    <div className="flex justify-between sm:col-span-2">
                      <span className="text-muted-foreground">Tipo</span>
                      <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
                        <Star className="h-3 w-3 mr-1" /> Sede Principal
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Contacto */}
              <div className="border-t pt-4 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contacto</h4>
                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teléfono</span>
                    <span className="font-medium">{telefono || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{email || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Facturación */}
              <div className="border-t pt-4 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Facturación Electrónica</h4>
                {factActiva ? (
                  <div className="grid gap-2 sm:grid-cols-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RUC</span>
                      <span className="font-mono font-medium">{factRuc || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Razón Social</span>
                      <span className="font-medium">{factRazonSocial || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IGV</span>
                      <span className="font-medium">{factPorcentajeImpuesto}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modo</span>
                      <Badge variant="outline" className={`text-[10px] ${factModoProduccion ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                        {factModoProduccion ? "Producción" : "Pruebas"}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Desactivada</p>
                )}
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
            Crear Sede
          </Button>
        )}
      </div>
    </div>
  );
}

const estadoStyles: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactivo: "bg-gray-50 text-gray-500 border-gray-200",
};
