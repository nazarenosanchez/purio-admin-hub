import { useState } from "react";
import { Settings, User, Bell, Shield, Palette, Globe, Database, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function Configuracion() {
  const [activeTab, setActiveTab] = useState("perfil");

  const tabs = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "notificaciones", label: "Notificaciones", icon: Bell },
    { id: "seguridad", label: "Seguridad", icon: Shield },
    { id: "apariencia", label: "Apariencia", icon: Palette },
    { id: "integraciones", label: "Integraciones", icon: Globe },
    { id: "sistema", label: "Sistema", icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona las preferencias y ajustes del sistema
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="shrink-0"
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Perfil */}
      {activeTab === "perfil" && (
        <div className="space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  AM
                </div>
                <div>
                  <Button variant="outline" size="sm">Cambiar Foto</Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input id="apellido" defaultValue="Master" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@purio.pe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" defaultValue="+51 984 123 456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" defaultValue="Administrador" />
                </div>
              </div>
              <Button>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notificaciones */}
      {activeTab === "notificaciones" && (
        <div className="space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Preferencias de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Nuevas reservas", desc: "Recibir notificación cuando hay una nueva reserva" },
                { label: "Pagos recibidos", desc: "Notificar cuando se complete un pago" },
                { label: "Nuevas calificaciones", desc: "Alertar sobre nuevas reseñas de clientes" },
                { label: "Cupones utilizados", desc: "Notificar cuando se use un cupón de descuento" },
                { label: "Recordatorios de salidas", desc: "Recordar salidas programadas 24h antes" },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Canales de Notificación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Email", icon: Mail },
                { label: "Push (Navegador)", icon: Bell },
                { label: "WhatsApp", icon: Globe },
              ].map((canal) => {
                const Icon = canal.icon;
                return (
                  <div key={canal.label} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{canal.label}</span>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seguridad */}
      {activeTab === "seguridad" && (
        <div className="space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Cambiar Contraseña</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Actualizar Contraseña</Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Autenticación de Dos Factores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">2FA Activado</div>
                  <div className="text-sm text-muted-foreground">
                    Protege tu cuenta con verificación en dos pasos
                  </div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-0">
                  Activo
                </Badge>
              </div>
              <Button variant="outline">Configurar 2FA</Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Sesiones Activas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { device: "Chrome - Windows", location: "Lima, Perú", time: "Ahora" },
                { device: "Safari - iPhone", location: "Cusco, Perú", time: "Hace 2 horas" },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{session.device}</div>
                    <div className="text-sm text-muted-foreground">
                      {session.location} • {session.time}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Cerrar</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Apariencia */}
      {activeTab === "apariencia" && (
        <div className="space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Tema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {["Claro", "Oscuro", "Automático"].map((tema) => (
                  <div
                    key={tema}
                    className="p-4 border-2 border-primary rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="font-medium text-center">{tema}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Idioma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="idioma">Idioma del Sistema</Label>
                <Input id="idioma" defaultValue="Español (Perú)" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Integraciones */}
      {activeTab === "integraciones" && (
        <div className="space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Pasarelas de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { nombre: "Mercado Pago", estado: "Conectado", color: "success" },
                { nombre: "PayPal", estado: "Conectado", color: "success" },
                { nombre: "Stripe", estado: "No conectado", color: "muted" },
                { nombre: "Yape", estado: "Conectado", color: "success" },
              ].map((pasarela) => (
                <div key={pasarela.nombre} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{pasarela.nombre}</div>
                      <Badge
                        variant="outline"
                        className={`${
                          pasarela.color === "success"
                            ? "bg-success/10 text-success"
                            : "bg-muted text-muted-foreground"
                        } border-0 text-xs`}
                      >
                        {pasarela.estado}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {pasarela.estado === "Conectado" ? "Configurar" : "Conectar"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sistema */}
      {activeTab === "sistema" && (
        <div className="space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Información del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3 border rounded">
                  <div className="text-xs text-muted-foreground">Versión</div>
                  <div className="font-semibold">v1.0.0</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-xs text-muted-foreground">Última Actualización</div>
                  <div className="font-semibold">28 Feb 2026</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-xs text-muted-foreground">Base de Datos</div>
                  <div className="font-semibold">PostgreSQL 14</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-xs text-muted-foreground">Servidor</div>
                  <div className="font-semibold">AWS - us-east-1</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Mantenimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Limpiar Caché
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Optimizar Base de Datos
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive">
                <Database className="mr-2 h-4 w-4" />
                Exportar Datos
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
