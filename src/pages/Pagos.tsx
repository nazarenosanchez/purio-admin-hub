import { useState } from "react";
import { CreditCard, DollarSign, Calendar, CheckCircle, XCircle, Clock, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data basado en tabla Pagos del DatabaseSchema.cs
const mockPagos = [
  {
    pagoId: 1,
    reservaId: 1,
    reservaCodigo: "RES-2025-001",
    operadorId: 1,
    transaccionId: 101,
    pagoCodigoTransaccion: "TXN-20250220-001",
    pagoMonto: 350.00,
    pagoMoneda: "PEN",
    pagoMetodoPago: "tarjeta_credito",
    pagoEstado: "completado",
    pagoTipo: "adelanto",
    pagoOrigen: "web",
    pagoPorcentajeDelTotal: 50,
    pagoNotas: "Pago inicial del 50%",
    pagoComprobanteUrl: null,
    pagoFechaPago: "2025-02-20T14:30:00",
    pagoFechaProcesamiento: "2025-02-20T14:30:15",
    clienteNombre: "Carlos Mendoza",
    tourNombre: "Machu Picchu Full Day",
  },
  {
    pagoId: 2,
    reservaId: 2,
    reservaCodigo: "RES-2025-002",
    operadorId: 1,
    transaccionId: 102,
    pagoCodigoTransaccion: "TXN-20250218-002",
    pagoMonto: 720.00,
    pagoMoneda: "PEN",
    pagoMetodoPago: "transferencia",
    pagoEstado: "completado",
    pagoTipo: "completo",
    pagoOrigen: "admin",
    pagoPorcentajeDelTotal: 100,
    pagoNotas: "Pago completo por transferencia",
    pagoComprobanteUrl: "/comprobantes/pago-002.pdf",
    pagoFechaPago: "2025-02-18T10:15:00",
    pagoFechaProcesamiento: "2025-02-18T10:15:30",
    clienteNombre: "Ana García",
    tourNombre: "Valle Sagrado + Maras",
  },
  {
    pagoId: 3,
    reservaId: 5,
    reservaCodigo: "RES-2025-005",
    operadorId: 1,
    transaccionId: 103,
    pagoCodigoTransaccion: "TXN-20250222-003",
    pagoMonto: 750.00,
    pagoMoneda: "PEN",
    pagoMetodoPago: "yape",
    pagoEstado: "completado",
    pagoTipo: "adelanto",
    pagoOrigen: "mobile",
    pagoPorcentajeDelTotal: 50,
    pagoNotas: "Adelanto vía Yape",
    pagoComprobanteUrl: null,
    pagoFechaPago: "2025-02-22T16:45:00",
    pagoFechaProcesamiento: "2025-02-22T16:45:20",
    clienteNombre: "José López",
    tourNombre: "Camino Inca 4D/3N",
  },
  {
    pagoId: 4,
    reservaId: 1,
    reservaCodigo: "RES-2025-001",
    operadorId: 1,
    transaccionId: 104,
    pagoCodigoTransaccion: "TXN-20250225-004",
    pagoMonto: 350.00,
    pagoMoneda: "PEN",
    pagoMetodoPago: "efectivo",
    pagoEstado: "pendiente",
    pagoTipo: "saldo",
    pagoOrigen: "admin",
    pagoPorcentajeDelTotal: 50,
    pagoNotas: "Saldo pendiente a pagar en efectivo",
    pagoComprobanteUrl: null,
    pagoFechaPago: "2025-02-25T09:00:00",
    pagoFechaProcesamiento: null,
    clienteNombre: "Carlos Mendoza",
    tourNombre: "Machu Picchu Full Day",
  },
  {
    pagoId: 5,
    reservaId: 4,
    reservaCodigo: "RES-2025-004",
    operadorId: 1,
    transaccionId: 105,
    pagoCodigoTransaccion: "TXN-20250215-005",
    pagoMonto: 1050.00,
    pagoMoneda: "PEN",
    pagoMetodoPago: "tarjeta_debito",
    pagoEstado: "completado",
    pagoTipo: "completo",
    pagoOrigen: "web",
    pagoPorcentajeDelTotal: 100,
    pagoNotas: "Pago completo con tarjeta de débito",
    pagoComprobanteUrl: "/comprobantes/pago-005.pdf",
    pagoFechaPago: "2025-02-15T11:20:00",
    pagoFechaProcesamiento: "2025-02-15T11:20:45",
    clienteNombre: "María Torres",
    tourNombre: "Machu Picchu Full Day",
  },
];

const estadoStyles: Record<string, string> = {
  completado: "bg-success/10 text-success border-0",
  pendiente: "bg-warning/10 text-warning border-0",
  rechazado: "bg-destructive/10 text-destructive border-0",
  reembolsado: "bg-info/10 text-info border-0",
};

const metodoPagoLabels: Record<string, string> = {
  tarjeta_credito: "Tarjeta Crédito",
  tarjeta_debito: "Tarjeta Débito",
  transferencia: "Transferencia",
  yape: "Yape",
  plin: "Plin",
  efectivo: "Efectivo",
  paypal: "PayPal",
  mercadopago: "Mercado Pago",
};

const tipoLabels: Record<string, string> = {
  adelanto: "Adelanto",
  saldo: "Saldo",
  completo: "Completo",
  reembolso: "Reembolso",
};

export default function Pagos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("todos");

  const filteredPagos = mockPagos.filter((pago) => {
    const matchSearch =
      pago.reservaCodigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pago.pagoCodigoTransaccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pago.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchEstado = filterEstado === "todos" || pago.pagoEstado === filterEstado;
    
    return matchSearch && matchEstado;
  });

  const totalPagos = filteredPagos.reduce((sum, p) => sum + p.pagoMonto, 0);
  const pagosCompletados = filteredPagos.filter(p => p.pagoEstado === "completado").length;
  const pagosPendientes = filteredPagos.filter(p => p.pagoEstado === "pendiente").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pagos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona los pagos y transacciones de las reservas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Total Pagos</p>
                <p className="text-2xl font-bold mt-1">S/ {totalPagos.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Completados</p>
                <p className="text-2xl font-bold mt-1">{pagosCompletados}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Pendientes</p>
                <p className="text-2xl font-bold mt-1">{pagosPendientes}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Buscar por código de reserva, transacción o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterEstado === "todos" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterEstado("todos")}
          >
            Todos
          </Button>
          <Button
            variant={filterEstado === "completado" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterEstado("completado")}
          >
            Completados
          </Button>
          <Button
            variant={filterEstado === "pendiente" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterEstado("pendiente")}
          >
            Pendientes
          </Button>
        </div>
      </div>

      {/* Pagos List */}
      <div className="space-y-3">
        {filteredPagos.map((pago) => (
          <Card key={pago.pagoId} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Left: Payment Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-base">{pago.clienteNombre}</span>
                        <Badge variant="outline" className="text-xs">
                          {pago.reservaCodigo}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{pago.tourNombre}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>{metodoPagoLabels[pago.pagoMetodoPago]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(pago.pagoFechaPago).toLocaleDateString("es-PE", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="text-xs font-mono bg-muted px-2 py-0.5 rounded">
                      {pago.pagoCodigoTransaccion}
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Status */}
                <div className="flex items-center gap-4 lg:flex-row-reverse">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      S/ {pago.pagoMonto.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {tipoLabels[pago.pagoTipo]} ({pago.pagoPorcentajeDelTotal}%)
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className={estadoStyles[pago.pagoEstado]}>
                      <span className="capitalize">{pago.pagoEstado}</span>
                    </Badge>
                    {pago.pagoComprobanteUrl && (
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Ver Comprobante
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {pago.pagoNotas && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-muted-foreground">{pago.pagoNotas}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPagos.length === 0 && (
        <Card className="border">
          <CardContent className="p-12 text-center">
            <DollarSign className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No se encontraron pagos</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
