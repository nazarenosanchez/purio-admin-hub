import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Save, ChevronRight, ChevronLeft,
  Calendar, DollarSign, Users, FileText, Clock,
  Map, Info, AlertCircle, CalendarPlus, Repeat,
  Plus, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { mockTours } from "@/data/mock-data";

const steps = [
  { id: "tour", label: "Tour & Fecha", icon: Calendar },
  { id: "precios", label: "Precios", icon: DollarSign },
  { id: "cupos", label: "Cupos", icon: Users },
  { id: "notas", label: "Notas & Estado", icon: FileText },
];

// Interfaces para salidas múltiples (batch)
interface FechaSalida {
  fecha: string;
  horaInicio: string;
  horaFin: string;
}

export default function SalidaNueva() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1: Tour & Fecha
  const [tourSeleccionado, setTourSeleccionado] = useState("");
  const [modoFecha, setModoFecha] = useState<"unica" | "multiple">("unica");
  const [fechas, setFechas] = useState<FechaSalida[]>([
    { fecha: "", horaInicio: "06:00", horaFin: "18:00" },
  ]);

  // Step 2: Precios (schema: SalidaPrecioBase, SalidaPrecioAdulto, etc.)
  const [precioBase, setPrecioBase] = useState("");
  const [precioAdulto, setPrecioAdulto] = useState("");
  const [precioNino, setPrecioNino] = useState("");
  const [precioInfante, setPrecioInfante] = useState("");
  const [usarPreciosTour, setUsarPreciosTour] = useState(true);

  // Step 3: Cupos (schema: SalidaCuposTotales → CupoSalida)
  const [cuposTotales, setCuposTotales] = useState("");
  const [cuposBloqueados, setCuposBloqueados] = useState("0");

  // Step 4: Notas & Estado
  const [estado, setEstado] = useState("programada");
  const [notasInternas, setNotasInternas] = useState("");

  const tourInfo = mockTours.find((t) => String(t.tourId) === tourSeleccionado);

  const addFecha = () => {
    setFechas([...fechas, { fecha: "", horaInicio: "06:00", horaFin: "18:00" }]);
  };

  const removeFecha = (index: number) => {
    setFechas(fechas.filter((_, i) => i !== index));
  };

  const updateFecha = (index: number, field: keyof FechaSalida, value: string) => {
    const updated = [...fechas];
    updated[index][field] = value;
    setFechas(updated);
  };

  const handleSave = () => {
    navigate("/salidas");
  };

  const fechasValidas = fechas.filter((f) => f.fecha).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/salidas")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nueva Salida</h1>
            <p className="text-sm text-muted-foreground">Programa una fecha de salida para un tour</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/salidas")}>Cancelar</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {fechasValidas > 1 ? `Crear ${fechasValidas} Salidas` : "Crear Salida"}
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
                ${isActive
                  ? "bg-[#3D3B6E] text-white"
                  : isDone
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {step.label}
            </button>
          );
        })}
      </div>

      {/* ==================== STEP 0: Tour & Fecha ==================== */}
      {currentStep === 0 && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Seleccionar tour */}
            <Card className="border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Map className="h-4 w-4 text-[#3D3B6E]" />
                  Seleccionar Tour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={tourSeleccionado} onValueChange={setTourSeleccionado}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Elige un tour del catálogo..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTours.map((tour) => (
                      <SelectItem key={tour.tourId} value={String(tour.tourId)}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{tour.tourCodigo}</span>
                          <span>{tour.tourNombre}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {tourInfo && (
                  <div className="mt-4 p-4 bg-[#E8E7F5]/50 rounded-lg border border-[#3D3B6E]/10">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#3D3B6E] flex items-center justify-center shrink-0">
                        <Map className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm">{tourInfo.tourNombre}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{tourInfo.tourCiudad}, {tourInfo.tourPais}</p>
                        <div className="flex gap-3 mt-2">
                          <span className="text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {tourInfo.tourDuracion}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <Users className="h-3 w-3 inline mr-1" />
                            {tourInfo.tourCapacidadMinima}-{tourInfo.tourCapacidadMaxima} pax
                          </span>
                          {tourInfo.tourPrecioBase && (
                            <span className="text-xs font-semibold text-[#3D3B6E]">
                              S/ {tourInfo.tourPrecioBase}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Fechas de salida */}
            <Card className="border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#3D3B6E]" />
                    Fecha y Hora de Salida
                  </CardTitle>
                  <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => { setModoFecha("unica"); setFechas([fechas[0] || { fecha: "", horaInicio: "06:00", horaFin: "18:00" }]); }}
                      className={`px-3 py-1 rounded text-xs font-medium transition-all ${modoFecha === "unica" ? "bg-white shadow-sm text-[#3D3B6E]" : "text-gray-500"}`}
                    >
                      <CalendarPlus className="h-3 w-3 inline mr-1" />
                      Única
                    </button>
                    <button
                      onClick={() => setModoFecha("multiple")}
                      className={`px-3 py-1 rounded text-xs font-medium transition-all ${modoFecha === "multiple" ? "bg-white shadow-sm text-[#3D3B6E]" : "text-gray-500"}`}
                    >
                      <Repeat className="h-3 w-3 inline mr-1" />
                      Múltiples
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {fechas.map((f, index) => (
                  <div key={index} className="flex items-end gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs">Fecha {modoFecha === "multiple" ? `#${index + 1}` : ""}</Label>
                      <Input
                        type="date"
                        value={f.fecha}
                        onChange={(e) => updateFecha(index, "fecha", e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="w-28 space-y-1">
                      <Label className="text-xs">Hora Inicio</Label>
                      <Input
                        type="time"
                        value={f.horaInicio}
                        onChange={(e) => updateFecha(index, "horaInicio", e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="w-28 space-y-1">
                      <Label className="text-xs">Hora Fin</Label>
                      <Input
                        type="time"
                        value={f.horaFin}
                        onChange={(e) => updateFecha(index, "horaFin", e.target.value)}
                        className="h-9"
                      />
                    </div>
                    {modoFecha === "multiple" && fechas.length > 1 && (
                      <Button variant="ghost" size="sm" className="text-red-500 h-9 w-9 p-0 shrink-0" onClick={() => removeFecha(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                {modoFecha === "multiple" && (
                  <Button variant="outline" size="sm" className="w-full" onClick={addFecha}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar otra fecha
                  </Button>
                )}

                {modoFecha === "multiple" && fechasValidas > 1 && (
                  <div className="flex items-center gap-2 p-3 bg-[#E8E7F5]/50 rounded-lg">
                    <Info className="h-4 w-4 text-[#3D3B6E]" />
                    <span className="text-xs text-[#3D3B6E]">
                      Se crearán <strong>{fechasValidas} salidas</strong> con los mismos precios y cupos
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar resumen */}
          <div>
            <Card className="border sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tour</span>
                    <span className="font-medium text-right max-w-[60%] truncate">
                      {tourInfo?.tourNombre || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salidas</span>
                    <span className="font-medium">{fechasValidas || "—"}</span>
                  </div>
                  {fechas.filter((f) => f.fecha).map((f, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">#{i + 1}</span>
                      <span className="font-mono">
                        {new Date(f.fecha + "T00:00").toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
                        {" "}{f.horaInicio}
                      </span>
                    </div>
                  ))}
                </div>
                {precioAdulto && (
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Precio adulto</span>
                      <span className="font-bold text-[#3D3B6E]">S/ {precioAdulto}</span>
                    </div>
                  </div>
                )}
                {cuposTotales && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cupos</span>
                    <span className="font-medium">{cuposTotales} pax</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ==================== STEP 1: Precios ==================== */}
      {currentStep === 1 && (
        <div className="max-w-2xl space-y-6">
          {tourInfo?.tourPrecioBase && (
            <Card className="border border-[#3D3B6E]/10 bg-[#E8E7F5]/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-[#3D3B6E]" />
                    <div>
                      <p className="text-sm font-medium">Precio base del tour: <strong className="text-[#3D3B6E]">S/ {tourInfo.tourPrecioBase}</strong></p>
                      <p className="text-xs text-muted-foreground">Puedes usar el precio del tour o definir precios específicos para esta salida</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Usar precios del tour</Label>
                    <Switch checked={usarPreciosTour} onCheckedChange={setUsarPreciosTour} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#3D3B6E]" />
                Precios por Tipo de Pasajero
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Define precios diferenciados según el schema SalidasTour
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 border rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#3D3B6E] flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Precio Base</Label>
                      <p className="text-[10px] text-muted-foreground">Referencia general</p>
                    </div>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={usarPreciosTour && tourInfo?.tourPrecioBase ? String(tourInfo.tourPrecioBase) : precioBase}
                    onChange={(e) => setPrecioBase(e.target.value)}
                    disabled={usarPreciosTour && !!tourInfo?.tourPrecioBase}
                    className="h-11 text-lg font-semibold"
                  />
                </div>

                <div className="p-4 border rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#3D3B6E]/80 flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Adulto</Label>
                      <p className="text-[10px] text-muted-foreground">Mayores de 12 años</p>
                    </div>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={precioAdulto}
                    onChange={(e) => setPrecioAdulto(e.target.value)}
                    className="h-11 text-lg font-semibold"
                  />
                </div>

                <div className="p-4 border rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Niño</Label>
                      <p className="text-[10px] text-muted-foreground">3 a 12 años</p>
                    </div>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={precioNino}
                    onChange={(e) => setPrecioNino(e.target.value)}
                    className="h-11 text-lg font-semibold"
                  />
                </div>

                <div className="p-4 border rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Infante</Label>
                      <p className="text-[10px] text-muted-foreground">Menores de 3 años</p>
                    </div>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={precioInfante}
                    onChange={(e) => setPrecioInfante(e.target.value)}
                    className="h-11 text-lg font-semibold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ==================== STEP 2: Cupos ==================== */}
      {currentStep === 2 && (
        <div className="max-w-2xl space-y-6">
          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-[#3D3B6E]" />
                Control de Cupos
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Cantidad de pasajeros permitidos para esta salida
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {tourInfo && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Capacidad del tour: {tourInfo.tourCapacidadMinima} - {tourInfo.tourCapacidadMaxima} personas
                  </span>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="p-5 border-2 border-[#3D3B6E]/20 rounded-xl space-y-3 bg-[#E8E7F5]/20">
                  <Label className="text-sm font-semibold">Cupos Totales *</Label>
                  <p className="text-xs text-muted-foreground">Capacidad máxima para esta salida</p>
                  <Input
                    type="number"
                    placeholder={tourInfo ? String(tourInfo.tourCapacidadMaxima) : "30"}
                    value={cuposTotales}
                    onChange={(e) => setCuposTotales(e.target.value)}
                    className="h-14 text-2xl font-bold text-center"
                  />
                </div>

                <div className="p-5 border rounded-xl space-y-3">
                  <Label className="text-sm font-semibold">Cupos Bloqueados</Label>
                  <p className="text-xs text-muted-foreground">Reserva interna (no disponibles para venta)</p>
                  <Input
                    type="number"
                    placeholder="0"
                    value={cuposBloqueados}
                    onChange={(e) => setCuposBloqueados(e.target.value)}
                    className="h-14 text-2xl font-bold text-center"
                  />
                </div>
              </div>

              {/* Preview de disponibilidad */}
              {cuposTotales && (
                <div className="p-5 bg-gray-50 rounded-xl space-y-3">
                  <h4 className="text-sm font-semibold">Vista previa de disponibilidad</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-[#3D3B6E]">{cuposTotales}</div>
                      <div className="text-xs text-muted-foreground">Totales</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">{cuposBloqueados || 0}</div>
                      <div className="text-xs text-muted-foreground">Bloqueados</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">
                        {Number(cuposTotales) - Number(cuposBloqueados || 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Disponibles</div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{
                        width: `${Math.max(0, 100 - (Number(cuposBloqueados || 0) / Number(cuposTotales)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {Number(cuposTotales) > 0 && tourInfo && Number(cuposTotales) > tourInfo.tourCapacidadMaxima && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <span className="text-xs text-amber-700">
                    Los cupos ({cuposTotales}) superan la capacidad máxima del tour ({tourInfo.tourCapacidadMaxima})
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ==================== STEP 3: Notas & Estado ==================== */}
      {currentStep === 3 && (
        <div className="max-w-2xl space-y-6">
          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Estado de la Salida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: "programada", label: "Programada", desc: "Pendiente de confirmar", color: "bg-gray-100 text-gray-700 border-gray-300" },
                  { value: "confirmada", label: "Confirmada", desc: "Lista para operar", color: "bg-emerald-50 text-emerald-700 border-emerald-300" },
                  { value: "cancelada", label: "Cancelada", desc: "No se realizará", color: "bg-red-50 text-red-700 border-red-300" },
                  { value: "completada", label: "Completada", desc: "Ya se realizó", color: "bg-blue-50 text-blue-700 border-blue-300" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setEstado(opt.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      estado === opt.value
                        ? `${opt.color} border-current`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold text-sm">{opt.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Notas Internas</CardTitle>
              <p className="text-xs text-muted-foreground">Información adicional visible solo para el equipo</p>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ej: Confirmar bus a las 4:30am, llevar botiquín extra, contacto del guía: 987654321..."
                rows={5}
                value={notasInternas}
                onChange={(e) => setNotasInternas(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Resumen final */}
          <Card className="border border-[#3D3B6E]/20 bg-[#E8E7F5]/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-[#3D3B6E]">Resumen de la Salida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tour</span>
                    <span className="font-semibold">{tourInfo?.tourNombre || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fechas</span>
                    <span className="font-semibold">{fechasValidas} salida(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estado</span>
                    <Badge variant="outline" className="capitalize">{estado}</Badge>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Adulto</span>
                    <span className="font-semibold">S/ {precioAdulto || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Niño</span>
                    <span className="font-semibold">S/ {precioNino || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cupos</span>
                    <span className="font-semibold">{cuposTotales || "—"} pax</span>
                  </div>
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
            {fechasValidas > 1 ? `Crear ${fechasValidas} Salidas` : "Crear Salida"}
          </Button>
        )}
      </div>
    </div>
  );
}
