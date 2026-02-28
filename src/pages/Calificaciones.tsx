import { useState } from "react";
import { Star, ThumbsUp, MessageSquare, Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock data basado en tabla Calificaciones del DatabaseSchema.cs
const mockCalificaciones = [
  {
    calificacionId: 1,
    reservaId: 2,
    clienteId: 2,
    tourId: 2,
    operadorId: 1,
    clienteNombre: "Ana García",
    tourNombre: "Valle Sagrado + Maras y Moray",
    calificacionPuntuacion: 5,
    calificacionComentario: "Excelente tour! El guía fue muy conocedor y los lugares visitados son impresionantes. Totalmente recomendado.",
    calificacionRespuestaOperador: "¡Muchas gracias Ana! Nos alegra que hayas disfrutado del tour. Esperamos verte pronto en otra aventura.",
    calificacionAprobado: true,
    calificacionDestacado: true,
    calificacionFechaCalificacion: "2025-02-19T15:30:00",
    createdAt: "2025-02-19T15:30:00",
  },
  {
    calificacionId: 2,
    reservaId: 4,
    clienteId: 4,
    tourId: 1,
    operadorId: 1,
    clienteNombre: "María Torres",
    tourNombre: "Machu Picchu Full Day",
    calificacionPuntuacion: 5,
    calificacionComentario: "Una experiencia inolvidable. Machu Picchu es mágico y el servicio fue impecable. El transporte fue cómodo y puntual.",
    calificacionRespuestaOperador: null,
    calificacionAprobado: true,
    calificacionDestacado: false,
    calificacionFechaCalificacion: "2025-02-16T18:45:00",
    createdAt: "2025-02-16T18:45:00",
  },
  {
    calificacionId: 3,
    reservaId: 1,
    clienteId: 1,
    tourId: 1,
    operadorId: 1,
    clienteNombre: "Carlos Mendoza",
    tourNombre: "Machu Picchu Full Day",
    calificacionPuntuacion: 4,
    calificacionComentario: "Muy buen tour en general. El único detalle es que el tiempo en Machu Picchu fue un poco corto. Me hubiera gustado tener más tiempo libre.",
    calificacionRespuestaOperador: "Gracias por tu feedback Carlos. Tomaremos en cuenta tu sugerencia para mejorar los tiempos del itinerario.",
    calificacionAprobado: true,
    calificacionDestacado: false,
    calificacionFechaCalificacion: "2025-02-21T10:20:00",
    createdAt: "2025-02-21T10:20:00",
  },
  {
    calificacionId: 4,
    reservaId: 5,
    clienteId: 5,
    tourId: 6,
    operadorId: 1,
    clienteNombre: "José López",
    tourNombre: "Camino Inca 4D/3N",
    calificacionPuntuacion: 5,
    calificacionComentario: "El Camino Inca superó todas mis expectativas. Los porteadores fueron increíbles, la comida deliciosa y las vistas espectaculares. Una experiencia que todos deberían vivir.",
    calificacionRespuestaOperador: null,
    calificacionAprobado: false,
    calificacionDestacado: false,
    calificacionFechaCalificacion: "2025-02-26T14:00:00",
    createdAt: "2025-02-26T14:00:00",
  },
  {
    calificacionId: 5,
    reservaId: 3,
    clienteId: 3,
    tourId: 3,
    operadorId: 1,
    clienteNombre: "Pedro Ruiz",
    tourNombre: "Montaña de 7 Colores (Vinicunca)",
    calificacionPuntuacion: 3,
    calificacionComentario: "El paisaje es hermoso pero la caminata es muy exigente. Recomiendo estar bien aclimatado antes de hacer este tour.",
    calificacionRespuestaOperador: null,
    calificacionAprobado: true,
    calificacionDestacado: false,
    calificacionFechaCalificacion: "2025-02-26T16:30:00",
    createdAt: "2025-02-26T16:30:00",
  },
];

const renderStars = (puntuacion: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < puntuacion ? "fill-warning text-warning" : "text-muted-foreground/30"
      }`}
    />
  ));
};

export default function Calificaciones() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPuntuacion, setFilterPuntuacion] = useState<number | null>(null);
  const [respuestaTexto, setRespuestaTexto] = useState<Record<number, string>>({});

  const filteredCalificaciones = mockCalificaciones.filter((cal) => {
    const matchSearch =
      cal.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cal.tourNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cal.calificacionComentario.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchPuntuacion = filterPuntuacion === null || cal.calificacionPuntuacion === filterPuntuacion;
    
    return matchSearch && matchPuntuacion;
  });

  const promedioCalificacion = (
    mockCalificaciones.reduce((sum, c) => sum + c.calificacionPuntuacion, 0) /
    mockCalificaciones.length
  ).toFixed(1);

  const totalAprobadas = mockCalificaciones.filter(c => c.calificacionAprobado).length;
  const totalDestacadas = mockCalificaciones.filter(c => c.calificacionDestacado).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calificaciones</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona las reseñas y calificaciones de tus tours
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Promedio</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold">{promedioCalificacion}</p>
                  <div className="flex">{renderStars(Math.round(Number(promedioCalificacion)))}</div>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Aprobadas</p>
                <p className="text-2xl font-bold mt-1">{totalAprobadas}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <ThumbsUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Destacadas</p>
                <p className="text-2xl font-bold mt-1">{totalDestacadas}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Buscar por cliente, tour o comentario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterPuntuacion === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterPuntuacion(null)}
          >
            Todas
          </Button>
          {[5, 4, 3, 2, 1].map((stars) => (
            <Button
              key={stars}
              variant={filterPuntuacion === stars ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPuntuacion(stars)}
            >
              {stars}★
            </Button>
          ))}
        </div>
      </div>

      {/* Calificaciones List */}
      <div className="space-y-4">
        {filteredCalificaciones.map((cal) => (
          <Card key={cal.calificacionId} className="border">
            <CardContent className="p-5 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{cal.clienteNombre}</h3>
                      <p className="text-xs text-muted-foreground">{cal.tourNombre}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex">{renderStars(cal.calificacionPuntuacion)}</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(cal.calificacionFechaCalificacion).toLocaleDateString("es-PE", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {cal.calificacionDestacado && (
                    <Badge variant="outline" className="bg-warning/10 text-warning border-0">
                      Destacada
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={
                      cal.calificacionAprobado
                        ? "bg-success/10 text-success border-0"
                        : "bg-muted text-muted-foreground border-0"
                    }
                  >
                    {cal.calificacionAprobado ? "Aprobada" : "Pendiente"}
                  </Badge>
                </div>
              </div>

              {/* Comentario */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">{cal.calificacionComentario}</p>
              </div>

              {/* Respuesta del operador */}
              {cal.calificacionRespuestaOperador ? (
                <div className="bg-primary/5 p-4 rounded-lg border-l-2 border-primary">
                  <p className="text-xs font-medium text-primary mb-1">Respuesta del operador:</p>
                  <p className="text-sm">{cal.calificacionRespuestaOperador}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Escribe una respuesta al cliente..."
                    value={respuestaTexto[cal.calificacionId] || ""}
                    onChange={(e) =>
                      setRespuestaTexto({ ...respuestaTexto, [cal.calificacionId]: e.target.value })
                    }
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Responder
                    </Button>
                    {!cal.calificacionAprobado && (
                      <Button size="sm" variant="outline">
                        Aprobar
                      </Button>
                    )}
                    {!cal.calificacionDestacado && (
                      <Button size="sm" variant="outline">
                        Destacar
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCalificaciones.length === 0 && (
        <Card className="border">
          <CardContent className="p-12 text-center">
            <Star className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No se encontraron calificaciones</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
