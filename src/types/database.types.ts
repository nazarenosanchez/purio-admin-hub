export type EstadoOperador = 'activo' | 'suspendido' | 'inactivo';
export type EstadoSede = 'activo' | 'inactivo';
export type EstadoTour = 'activo' | 'inactivo' | 'borrador';
export type EstadoReserva = 'pendiente_pago' | 'confirmada' | 'completada' | 'cancelada';
export type EstadoPago = 'pendiente' | 'adelanto_pagado' | 'pagado' | 'reembolsado';
export type OrigenReserva = 'web' | 'mobile' | 'admin' | 'whatsapp';

export interface OperadorTuristico {
  operadorId: number;
  operadorRazonSocial: string;
  operadorNombreComercial: string;
  operadorRuc: string;
  operadorEmail: string;
  operadorTelefono?: string;
  operadorEstado: EstadoOperador;
  operadorFechaRegistro: string;
}

export interface Sede {
  sedeId: number;
  operadorId: number;
  sedeCodigo: string;
  sedeNombre: string;
  sedeCiudad: string;
  sedePais: string;
  sedeEsPrincipal: boolean;
  sedeEstado: EstadoSede;
}

export interface Tour {
  tourId: number;
  operadorId: number;
  sedeId: number;
  tourCodigo: string;
  tourNombre: string;
  tourDescripcionCorta?: string;
  tourCiudad: string;
  tourPais: string;
  tourDuracion: string;
  tourCapacidadMaxima: number;
  tourCapacidadMinima: number;
  tourEstado: EstadoTour;
  tourDestacado: boolean;
  tourPrecioBase?: number;
  createdAt: string;
}

export interface Reserva {
  reservaId: number;
  reservaCodigo: string;
  operadorId: number;
  salidaId: number;
  clienteId: number;
  clienteNombre?: string;
  tourNombre?: string;
  reservaCantidadTotal: number;
  reservaTotal: number;
  reservaMontoPagado: number;
  reservaSaldoPendiente: number;
  reservaEstado: EstadoReserva;
  reservaEstadoPago: EstadoPago;
  reservaOrigen: OrigenReserva;
  reservaFechaReserva: string;
}

export interface Cliente {
  clienteId: number;
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono?: string;
  clienteDocumento: string;
}
