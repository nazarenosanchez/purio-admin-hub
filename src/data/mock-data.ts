import type { Tour, Reserva } from '@/types/database.types';

export const mockTours: Tour[] = [
  { tourId: 1, operadorId: 1, sedeId: 1, tourCodigo: 'TUR-001', tourNombre: 'Machu Picchu Clásico', tourDescripcionCorta: 'Recorrido por la ciudadela inca con guía experto', tourCiudad: 'Cusco', tourPais: 'Perú', tourDuracion: '2 días', tourCapacidadMaxima: 30, tourCapacidadMinima: 4, tourEstado: 'activo', tourDestacado: true, tourPrecioBase: 350, createdAt: '2025-01-15' },
  { tourId: 2, operadorId: 1, sedeId: 1, tourCodigo: 'TUR-002', tourNombre: 'Valle Sagrado Completo', tourDescripcionCorta: 'Visita a Pisac, Ollantaytambo y Chinchero', tourCiudad: 'Cusco', tourPais: 'Perú', tourDuracion: '1 día', tourCapacidadMaxima: 20, tourCapacidadMinima: 2, tourEstado: 'activo', tourDestacado: false, tourPrecioBase: 180, createdAt: '2025-01-20' },
  { tourId: 3, operadorId: 1, sedeId: 1, tourCodigo: 'TUR-003', tourNombre: 'Montaña de 7 Colores', tourDescripcionCorta: 'Trekking a Vinicunca con paisajes increíbles', tourCiudad: 'Cusco', tourPais: 'Perú', tourDuracion: '1 día', tourCapacidadMaxima: 25, tourCapacidadMinima: 4, tourEstado: 'activo', tourDestacado: true, tourPrecioBase: 120, createdAt: '2025-02-01' },
  { tourId: 4, operadorId: 1, sedeId: 2, tourCodigo: 'TUR-004', tourNombre: 'Islas Ballestas', tourDescripcionCorta: 'Paseo en bote por las islas con fauna marina', tourCiudad: 'Ica', tourPais: 'Perú', tourDuracion: '4 horas', tourCapacidadMaxima: 40, tourCapacidadMinima: 8, tourEstado: 'activo', tourDestacado: false, tourPrecioBase: 80, createdAt: '2025-02-10' },
  { tourId: 5, operadorId: 1, sedeId: 2, tourCodigo: 'TUR-005', tourNombre: 'Lago Titicaca & Uros', tourDescripcionCorta: 'Navegación por el lago más alto del mundo', tourCiudad: 'Puno', tourPais: 'Perú', tourDuracion: '1 día', tourCapacidadMaxima: 20, tourCapacidadMinima: 4, tourEstado: 'borrador', tourDestacado: false, tourPrecioBase: 150, createdAt: '2025-02-15' },
  { tourId: 6, operadorId: 1, sedeId: 1, tourCodigo: 'TUR-006', tourNombre: 'Camino Inca 4D/3N', tourDescripcionCorta: 'Ruta clásica del Camino Inca a Machu Picchu', tourCiudad: 'Cusco', tourPais: 'Perú', tourDuracion: '4 días', tourCapacidadMaxima: 16, tourCapacidadMinima: 2, tourEstado: 'activo', tourDestacado: true, tourPrecioBase: 750, createdAt: '2025-03-01' },
];

export const mockReservas: Reserva[] = [
  { reservaId: 1, reservaCodigo: 'RES-2025-001', operadorId: 1, salidaId: 1, clienteId: 1, clienteNombre: 'Carlos Mendoza', tourNombre: 'Machu Picchu Clásico', reservaCantidadTotal: 2, reservaTotal: 700, reservaMontoPagado: 350, reservaSaldoPendiente: 350, reservaEstado: 'confirmada', reservaEstadoPago: 'adelanto_pagado', reservaOrigen: 'web', reservaFechaReserva: '2025-02-20' },
  { reservaId: 2, reservaCodigo: 'RES-2025-002', operadorId: 1, salidaId: 2, clienteId: 2, clienteNombre: 'Ana García', tourNombre: 'Valle Sagrado Completo', reservaCantidadTotal: 4, reservaTotal: 720, reservaMontoPagado: 720, reservaSaldoPendiente: 0, reservaEstado: 'completada', reservaEstadoPago: 'pagado', reservaOrigen: 'admin', reservaFechaReserva: '2025-02-18' },
  { reservaId: 3, reservaCodigo: 'RES-2025-003', operadorId: 1, salidaId: 3, clienteId: 3, clienteNombre: 'Pedro Ruiz', tourNombre: 'Montaña de 7 Colores', reservaCantidadTotal: 1, reservaTotal: 120, reservaMontoPagado: 0, reservaSaldoPendiente: 120, reservaEstado: 'pendiente_pago', reservaEstadoPago: 'pendiente', reservaOrigen: 'whatsapp', reservaFechaReserva: '2025-02-25' },
  { reservaId: 4, reservaCodigo: 'RES-2025-004', operadorId: 1, salidaId: 1, clienteId: 4, clienteNombre: 'María Torres', tourNombre: 'Machu Picchu Clásico', reservaCantidadTotal: 3, reservaTotal: 1050, reservaMontoPagado: 1050, reservaSaldoPendiente: 0, reservaEstado: 'completada', reservaEstadoPago: 'pagado', reservaOrigen: 'web', reservaFechaReserva: '2025-02-15' },
  { reservaId: 5, reservaCodigo: 'RES-2025-005', operadorId: 1, salidaId: 4, clienteId: 5, clienteNombre: 'José López', tourNombre: 'Camino Inca 4D/3N', reservaCantidadTotal: 2, reservaTotal: 1500, reservaMontoPagado: 750, reservaSaldoPendiente: 750, reservaEstado: 'confirmada', reservaEstadoPago: 'adelanto_pagado', reservaOrigen: 'mobile', reservaFechaReserva: '2025-02-22' },
  { reservaId: 6, reservaCodigo: 'RES-2025-006', operadorId: 1, salidaId: 2, clienteId: 6, clienteNombre: 'Laura Díaz', tourNombre: 'Islas Ballestas', reservaCantidadTotal: 5, reservaTotal: 400, reservaMontoPagado: 0, reservaSaldoPendiente: 400, reservaEstado: 'cancelada', reservaEstadoPago: 'pendiente', reservaOrigen: 'web', reservaFechaReserva: '2025-02-10' },
];

export const mockDashboardStats = {
  totalReservas: 156,
  reservasEsteMes: 42,
  ingresosTotales: 45320,
  ingresosMes: 12840,
  toursActivos: 12,
  ocupacionPromedio: 78,
  clientesNuevos: 28,
  cancelaciones: 3,
};

export const mockRevenueData = [
  { mes: 'Sep', ingresos: 8200, reservas: 24 },
  { mes: 'Oct', ingresos: 9500, reservas: 31 },
  { mes: 'Nov', ingresos: 11200, reservas: 38 },
  { mes: 'Dic', ingresos: 15400, reservas: 52 },
  { mes: 'Ene', ingresos: 13800, reservas: 45 },
  { mes: 'Feb', ingresos: 12840, reservas: 42 },
];

export const mockTourPopularity = [
  { nombre: 'Machu Picchu', reservas: 45 },
  { nombre: 'Valle Sagrado', reservas: 32 },
  { nombre: '7 Colores', reservas: 28 },
  { nombre: 'Camino Inca', reservas: 22 },
  { nombre: 'Islas Ballestas', reservas: 18 },
  { nombre: 'Lago Titicaca', reservas: 11 },
];
