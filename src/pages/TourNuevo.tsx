import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Save, ChevronRight, ChevronLeft,
  Map, ListOrdered, Package, Tag, Image, Shield,
  Plus, Trash2, GripVertical, Clock, MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

// Steps del formulario
const steps = [
  { id: "info", label: "Información", icon: Map },
  { id: "itinerario", label: "Itinerario", icon: ListOrdered },
  { id: "detalles", label: "Detalles", icon: Package },
  { id: "categorias", label: "Categorías", icon: Tag },
  { id: "imagenes", label: "Imágenes", icon: Image },
  { id: "politicas", label: "Políticas", icon: Shield },
];

// Mock categorías del schema Categorias
const mockCategorias = [
  { categoriaId: 1, categoriaNombre: "Aventura", categoriaSlug: "aventura", categoriaColor: "#FF5722", categoriaActivo: true },
  { categoriaId: 2, categoriaNombre: "Cultural", categoriaSlug: "cultural", categoriaColor: "#9C27B0", categoriaActivo: true },
  { categoriaId: 3, categoriaNombre: "Gastronómico", categoriaSlug: "gastronomico", categoriaColor: "#FF9800", categoriaActivo: true },
  { categoriaId: 4, categoriaNombre: "Naturaleza", categoriaSlug: "naturaleza", categoriaColor: "#4CAF50", categoriaActivo: true },
  { categoriaId: 5, categoriaNombre: "Trekking", categoriaSlug: "trekking", categoriaColor: "#795548", categoriaActivo: true },
  { categoriaId: 6, categoriaNombre: "City Tour", categoriaSlug: "city-tour", categoriaColor: "#2196F3", categoriaActivo: true },
  { categoriaId: 7, categoriaNombre: "Deportes Extremos", categoriaSlug: "deportes-extremos", categoriaColor: "#F44336", categoriaActivo: true },
  { categoriaId: 8, categoriaNombre: "Religioso", categoriaSlug: "religioso", categoriaColor: "#607D8B", categoriaActivo: true },
];

// Interfaces para los sub-items del formulario
interface ItinerarioItem {
  diaNumero: number;
  titulo: string;
  descripcion: string;
  horaInicio: string;
  horaFin: string;
  ubicacion: string;
}

interface DetalleItem {
  tipo: string;
  titulo: string;
  descripcion: string;
}

interface AdicionalItem {
  nombre: string;
  descripcion: string;
  precio: string;
  tipo: string;
  obligatorio: boolean;
}

interface PoliticaItem {
  diasAntes: string;
  porcentajePenalidad: string;
  descripcion: string;
}

export default function TourNuevo() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // State para itinerario (schema: ItinerarioTour)
  const [itinerario, setItinerario] = useState<ItinerarioItem[]>([
    { diaNumero: 1, titulo: "", descripcion: "", horaInicio: "06:00", horaFin: "18:00", ubicacion: "" },
  ]);

  // State para detalles (schema: TourDetalles)
  const [detallesIncluye, setDetallesIncluye] = useState<DetalleItem[]>([
    { tipo: "incluye", titulo: "", descripcion: "" },
  ]);
  const [detallesNoIncluye, setDetallesNoIncluye] = useState<DetalleItem[]>([
    { tipo: "no_incluye", titulo: "", descripcion: "" },
  ]);
  const [recomendaciones, setRecomendaciones] = useState<DetalleItem[]>([
    { tipo: "recomendacion", titulo: "", descripcion: "" },
  ]);

  // State para adicionales (schema: TourAdicionales)
  const [adicionales, setAdicionales] = useState<AdicionalItem[]>([]);

  // State para categorías seleccionadas (schema: TourCategorias)
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>([]);

  // State para políticas (schema: PoliticasCancelacion)
  const [politicas, setPoliticas] = useState<PoliticaItem[]>([
    { diasAntes: "30", porcentajePenalidad: "0", descripcion: "Cancelación gratuita" },
    { diasAntes: "15", porcentajePenalidad: "50", descripcion: "50% de penalidad" },
    { diasAntes: "7", porcentajePenalidad: "100", descripcion: "No reembolsable" },
  ]);

  const toggleCategoria = (id: number) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    // TODO: enviar al backend
    navigate("/tours");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/tours")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nuevo Tour</h1>
            <p className="text-sm text-muted-foreground">Completa la información para crear un tour</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/tours")}>Cancelar</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Tour
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

      {/* ==================== STEP 0: Información General (Tours) ==================== */}
      {currentStep === 0 && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Código *</Label>
                    <Input placeholder="MP-001" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nombre del Tour *</Label>
                    <Input placeholder="Machu Picchu Full Day" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descripción Corta *</Label>
                  <Input placeholder="Breve descripción para tarjetas y listados" />
                </div>
                <div className="space-y-2">
                  <Label>Descripción Completa</Label>
                  <Textarea placeholder="Descripción detallada del tour..." rows={5} />
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Ubicación y Logística</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Ciudad *</Label>
                    <Input placeholder="Cusco" />
                  </div>
                  <div className="space-y-2">
                    <Label>País *</Label>
                    <Input placeholder="Perú" />
                  </div>
                  <div className="space-y-2">
                    <Label>Punto de Encuentro</Label>
                    <Input placeholder="Plaza de Armas de Cusco" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Duración *</Label>
                    <Input placeholder="1 día" />
                  </div>
                  <div className="space-y-2">
                    <Label>Dificultad</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facil">Fácil</SelectItem>
                        <SelectItem value="moderada">Moderada</SelectItem>
                        <SelectItem value="dificil">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Idiomas</Label>
                    <Input placeholder="Español, Inglés" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Capacidad Mínima *</Label>
                    <Input type="number" placeholder="2" />
                  </div>
                  <div className="space-y-2">
                    <Label>Capacidad Máxima *</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar derecho */}
          <div className="space-y-6">
            <Card className="border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Publicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select defaultValue="borrador">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Tour Destacado</Label>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Orden de Visualización</Label>
                  <Input type="number" placeholder="1" />
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Configuración de Pagos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Precio Base (S/)</Label>
                  <Input type="number" placeholder="450.00" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Permite Pago Parcial</Label>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>% Adelanto Mínimo</Label>
                  <Input type="number" placeholder="30" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ==================== STEP 1: Itinerario (ItinerarioTour) ==================== */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Define el itinerario día por día del tour</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setItinerario([
                  ...itinerario,
                  { diaNumero: itinerario.length + 1, titulo: "", descripcion: "", horaInicio: "06:00", horaFin: "18:00", ubicacion: "" },
                ])
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Día
            </Button>
          </div>

          {itinerario.map((dia, index) => (
            <Card key={index} className="border">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3D3B6E] text-white font-bold text-sm shrink-0">
                    {dia.diaNumero}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Día {dia.diaNumero}</h3>
                      {itinerario.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 h-8"
                          onClick={() => setItinerario(itinerario.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Título *</Label>
                        <Input
                          placeholder="Ej: Llegada y aclimatación"
                          value={dia.titulo}
                          onChange={(e) => {
                            const updated = [...itinerario];
                            updated[index].titulo = e.target.value;
                            setItinerario(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Ubicación</Label>
                        <Input
                          placeholder="Ej: Cusco centro"
                          value={dia.ubicacion}
                          onChange={(e) => {
                            const updated = [...itinerario];
                            updated[index].ubicacion = e.target.value;
                            setItinerario(updated);
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Hora Inicio</Label>
                        <Input
                          type="time"
                          value={dia.horaInicio}
                          onChange={(e) => {
                            const updated = [...itinerario];
                            updated[index].horaInicio = e.target.value;
                            setItinerario(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Hora Fin</Label>
                        <Input
                          type="time"
                          value={dia.horaFin}
                          onChange={(e) => {
                            const updated = [...itinerario];
                            updated[index].horaFin = e.target.value;
                            setItinerario(updated);
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea
                        placeholder="Describe las actividades de este día..."
                        rows={3}
                        value={dia.descripcion}
                        onChange={(e) => {
                          const updated = [...itinerario];
                          updated[index].descripcion = e.target.value;
                          setItinerario(updated);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ==================== STEP 2: Detalles (TourDetalles + TourAdicionales) ==================== */}
      {currentStep === 2 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Incluye */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-emerald-700">¿Qué incluye?</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setDetallesIncluye([...detallesIncluye, { tipo: "incluye", titulo: "", descripcion: "" }])}>
                  <Plus className="h-3 w-3 mr-1" /> Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {detallesIncluye.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder="Ej: Transporte turístico"
                    className="flex-1"
                    value={item.titulo}
                    onChange={(e) => {
                      const updated = [...detallesIncluye];
                      updated[i].titulo = e.target.value;
                      setDetallesIncluye(updated);
                    }}
                  />
                  {detallesIncluye.length > 1 && (
                    <Button variant="ghost" size="sm" className="text-red-500 h-9 w-9 p-0" onClick={() => setDetallesIncluye(detallesIncluye.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* No incluye */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-red-600">¿Qué NO incluye?</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setDetallesNoIncluye([...detallesNoIncluye, { tipo: "no_incluye", titulo: "", descripcion: "" }])}>
                  <Plus className="h-3 w-3 mr-1" /> Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {detallesNoIncluye.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder="Ej: Propinas"
                    className="flex-1"
                    value={item.titulo}
                    onChange={(e) => {
                      const updated = [...detallesNoIncluye];
                      updated[i].titulo = e.target.value;
                      setDetallesNoIncluye(updated);
                    }}
                  />
                  {detallesNoIncluye.length > 1 && (
                    <Button variant="ghost" size="sm" className="text-red-500 h-9 w-9 p-0" onClick={() => setDetallesNoIncluye(detallesNoIncluye.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recomendaciones */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-amber-600">Recomendaciones</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setRecomendaciones([...recomendaciones, { tipo: "recomendacion", titulo: "", descripcion: "" }])}>
                  <Plus className="h-3 w-3 mr-1" /> Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recomendaciones.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder="Ej: Llevar protector solar"
                    className="flex-1"
                    value={item.titulo}
                    onChange={(e) => {
                      const updated = [...recomendaciones];
                      updated[i].titulo = e.target.value;
                      setRecomendaciones(updated);
                    }}
                  />
                  {recomendaciones.length > 1 && (
                    <Button variant="ghost" size="sm" className="text-red-500 h-9 w-9 p-0" onClick={() => setRecomendaciones(recomendaciones.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Adicionales (extras) - schema: TourAdicionales */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-[#3D3B6E]">Extras / Adicionales</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setAdicionales([...adicionales, { nombre: "", descripcion: "", precio: "", tipo: "opcional", obligatorio: false }])}>
                  <Plus className="h-3 w-3 mr-1" /> Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {adicionales.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Sin extras. Agrega servicios opcionales como seguro, almuerzo, etc.</p>
              )}
              {adicionales.map((item, i) => (
                <div key={i} className="p-3 border rounded-lg space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nombre del extra"
                      className="flex-1"
                      value={item.nombre}
                      onChange={(e) => {
                        const updated = [...adicionales];
                        updated[i].nombre = e.target.value;
                        setAdicionales(updated);
                      }}
                    />
                    <Input
                      placeholder="S/"
                      type="number"
                      className="w-24"
                      value={item.precio}
                      onChange={(e) => {
                        const updated = [...adicionales];
                        updated[i].precio = e.target.value;
                        setAdicionales(updated);
                      }}
                    />
                    <Button variant="ghost" size="sm" className="text-red-500 h-9 w-9 p-0" onClick={() => setAdicionales(adicionales.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Select
                      value={item.tipo}
                      onValueChange={(val) => {
                        const updated = [...adicionales];
                        updated[i].tipo = val;
                        setAdicionales(updated);
                      }}
                    >
                      <SelectTrigger className="w-40 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opcional">Opcional</SelectItem>
                        <SelectItem value="servicio">Servicio</SelectItem>
                        <SelectItem value="equipo">Equipo</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`oblig-${i}`}
                        checked={item.obligatorio}
                        onCheckedChange={(checked) => {
                          const updated = [...adicionales];
                          updated[i].obligatorio = !!checked;
                          setAdicionales(updated);
                        }}
                      />
                      <Label htmlFor={`oblig-${i}`} className="text-xs">Obligatorio</Label>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ==================== STEP 3: Categorías (TourCategorias) ==================== */}
      {currentStep === 3 && (
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-base">Categorías del Tour</CardTitle>
            <p className="text-sm text-muted-foreground">Selecciona una o más categorías para este tour</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {mockCategorias.map((cat) => {
                const isSelected = categoriasSeleccionadas.includes(cat.categoriaId);
                return (
                  <button
                    key={cat.categoriaId}
                    onClick={() => toggleCategoria(cat.categoriaId)}
                    className={`
                      p-4 rounded-xl border-2 text-left transition-all
                      ${isSelected
                        ? "border-[#3D3B6E] bg-[#E8E7F5]"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: cat.categoriaColor }}
                      />
                      {isSelected && (
                        <Badge className="bg-[#3D3B6E] text-white text-[10px] px-2 py-0">
                          Seleccionado
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm">{cat.categoriaNombre}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.categoriaSlug}</p>
                  </button>
                );
              })}
            </div>

            {categoriasSeleccionadas.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  {categoriasSeleccionadas.length} categoría(s) seleccionada(s):
                </p>
                <div className="flex flex-wrap gap-2">
                  {categoriasSeleccionadas.map((id) => {
                    const cat = mockCategorias.find((c) => c.categoriaId === id);
                    return cat ? (
                      <Badge
                        key={id}
                        variant="outline"
                        className="px-3 py-1 cursor-pointer hover:bg-red-50"
                        onClick={() => toggleCategoria(id)}
                      >
                        <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: cat.categoriaColor }} />
                        {cat.categoriaNombre}
                        <span className="ml-2 text-red-400">×</span>
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ==================== STEP 4: Imágenes (ImagenesTour) ==================== */}
      {currentStep === 4 && (
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-base">Galería de Imágenes</CardTitle>
            <p className="text-sm text-muted-foreground">Sube las imágenes del tour. La primera será la imagen principal.</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Placeholder upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-[#3D3B6E] hover:bg-[#E8E7F5]/30 transition-colors cursor-pointer">
                <Image className="h-10 w-10 text-gray-300 mb-3" />
                <p className="text-sm font-medium text-gray-500">Subir imagen</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
              </div>
              {/* Mock images */}
              {[1, 2, 3].map((n) => (
                <div key={n} className="relative group border rounded-xl overflow-hidden bg-gradient-to-br from-[#3D3B6E]/10 to-[#5B5891]/10 h-44 flex items-center justify-center">
                  <Map className="h-12 w-12 text-[#3D3B6E]/20" />
                  {n === 1 && (
                    <Badge className="absolute top-2 left-2 bg-[#3D3B6E] text-white text-[10px]">Principal</Badge>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" className="h-8">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ==================== STEP 5: Políticas (PoliticasCancelacion) ==================== */}
      {currentStep === 5 && (
        <Card className="border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Políticas de Cancelación</CardTitle>
                <p className="text-sm text-muted-foreground">Define las penalidades según días de anticipación</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPoliticas([...politicas, { diasAntes: "", porcentajePenalidad: "", descripcion: "" }])}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Regla
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {politicas.map((pol, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1 grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Días antes</Label>
                      <Input
                        type="number"
                        value={pol.diasAntes}
                        onChange={(e) => {
                          const updated = [...politicas];
                          updated[i].diasAntes = e.target.value;
                          setPoliticas(updated);
                        }}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">% Penalidad</Label>
                      <Input
                        type="number"
                        value={pol.porcentajePenalidad}
                        onChange={(e) => {
                          const updated = [...politicas];
                          updated[i].porcentajePenalidad = e.target.value;
                          setPoliticas(updated);
                        }}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Descripción</Label>
                      <Input
                        value={pol.descripcion}
                        onChange={(e) => {
                          const updated = [...politicas];
                          updated[i].descripcion = e.target.value;
                          setPoliticas(updated);
                        }}
                        className="h-9"
                      />
                    </div>
                  </div>
                  {politicas.length > 1 && (
                    <Button variant="ghost" size="sm" className="text-red-500 h-9 w-9 p-0 shrink-0" onClick={() => setPoliticas(politicas.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Preview */}
            {politicas.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold mb-3">Vista previa</h4>
                <div className="space-y-2">
                  {politicas
                    .filter((p) => p.diasAntes && p.porcentajePenalidad)
                    .sort((a, b) => Number(b.diasAntes) - Number(a.diasAntes))
                    .map((p, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Más de {p.diasAntes} días antes:
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            Number(p.porcentajePenalidad) === 0
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : Number(p.porcentajePenalidad) >= 100
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {Number(p.porcentajePenalidad) === 0
                            ? "Gratis"
                            : `${p.porcentajePenalidad}% penalidad`}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
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
            Guardar Tour
          </Button>
        )}
      </div>
    </div>
  );
}
