# Análisis del DatabaseSchema.cs

Este documento mapea las entidades del `DatabaseSchema.cs` con los módulos implementados en el Admin Panel.

## ✅ Módulos Implementados

### 1. **Tours** (Tabla: `Tours`)
**Campos principales del schema:**
- `TourId`, `OperadorId`, `SedeId`
- `TourCodigo`, `TourNombre`, `TourDescripcion`, `TourDescripcionCorta`
- `TourCiudad`, `TourPais`, `TourDuracion`
- `TourCapacidadMaxima`, `TourCapacidadMinima`, `TourDificultad`
- `TourPuntoEncuentro`, `TourIncluye`, `TourNoIncluye`
- `TourEstado`, `TourDestacado`, `TourPrecioBase`
- `TourOrdenVisualizacion`

**Estado:** ✅ Implementado con campos correctos del schema

**Tablas relacionadas:**
- `ItinerarioTour` - Itinerario día por día
- `TourAdicionales` - Extras opcionales
- `TourDetalles` - Detalles estructurados
- `ImagenesTour` - Galería de imágenes
- `PoliticasCancelacion` - Políticas de cancelación
- `TourCategorias` - Relación N:N con categorías

---

### 2. **Salidas** (Tabla: `SalidasTour`)
**Campos principales del schema:**
- `SalidaId`, `TourId`, `OperadorId`, `SedeId`
- `SalidaFechaSalida`, `SalidaHoraSalida`, `SalidaHoraFin`
- `SalidaPrecioBase`, `SalidaPrecioAdulto`, `SalidaPrecioNino`, `SalidaPrecioInfante`
- `SalidaCuposTotales`, `SalidaEstado`
- `SalidaNotasInternas`

**Estado:** ✅ Implementado con vista calendario y grid

**Tablas relacionadas:**
- `CupoSalida` - Control de disponibilidad
- `BloqueoCupo` - Bloqueo temporal (10 min)

---

### 3. **Clientes** (Tabla: `Clientes`)
**Campos principales del schema:**
- `ClienteId`
- `ClienteEmail`, `ClienteNombre`, `ClienteApellido`
- `ClienteTelefono`
- `ClienteDocumentoTipo`, `ClienteDocumentoNumero`
- `ClientePais`, `ClienteCiudad`
- `ClienteFechaNacimiento`
- `ClientePreferenciasJson`

**Estado:** ✅ Implementado con campos correctos

---

### 4. **Reservas** (Tabla: `Reservas`)
**Campos principales del schema:**
- `ReservaId`, `ReservaCodigo`
- `OperadorId`, `SalidaId`, `ClienteId`, `SedeId`
- `ReservaCantidadTotal`, `ReservaCantidadAdultos`, `ReservaCantidadNinos`, `ReservaCantidadInfantes`
- `ReservaPrecioUnitario`, `ReservaSubtotal`, `ReservaDescuento`, `ReservaTotal`
- `ReservaAdelantoMinimo`, `ReservaPorcentajeAdelanto`
- `ReservaMontoPagado`, `ReservaSaldoPendiente`
- `ReservaRequierePagoCompleto`
- `ReservaEstado`, `ReservaEstadoPago`, `ReservaOrigen`
- `ReservaNotasCliente`, `ReservaNotasInternas`
- `ReservaFechaReserva`, `ReservaFechaConfirmacion`, `ReservaFechaPagoCompleto`

**Estado:** ✅ Implementado

**Tablas relacionadas:**
- `PasajerosReserva` - Pasajeros incluidos en la reserva

---

## 🔄 Módulos en Sidebar (Pendientes de Implementación)

### 5. **Pagos** (Tabla: `Pagos`)
**Campos del schema:**
- `PagoId`, `ReservaId`, `OperadorId`, `TransaccionId`
- `PagoCodigoTransaccion`, `PagoMonto`, `PagoMoneda`
- `PagoMetodoPago`, `PagoEstado`, `PagoTipo`, `PagoOrigen`
- `PagoPorcentajeDelTotal`, `PagoNotas`
- `PagoComprobanteUrl`
- `PagoFechaPago`, `PagoFechaProcesamiento`

**Tablas relacionadas:**
- `IntegracionesPago` - Configuración de pasarelas
- `Transacciones` - Registro inmutable de transacciones

**Estado:** 🔄 Ruta creada, pendiente implementación

---

### 6. **Cupones** (Tabla: `Cupones`)
**Campos del schema:**
- `CuponId`, `OperadorId`
- `CuponCodigo`, `CuponDescripcion`
- `CuponTipo`, `CuponValor`
- `CuponMontoMinimo`
- `CuponUsosMaximos`, `CuponUsosActuales`
- `CuponFechaInicio`, `CuponFechaFin`
- `CuponRestriccionesJson`, `CuponActivo`

**Tablas relacionadas:**
- `ReservaCupones` - Relación N:N con reservas

**Estado:** 🔄 Ruta creada, pendiente implementación

---

### 7. **Calificaciones** (Tabla: `Calificaciones`)
**Campos del schema:**
- `CalificacionId`, `ReservaId`, `ClienteId`, `TourId`, `OperadorId`
- `CalificacionPuntuacion` (1-5)
- `CalificacionComentario`
- `CalificacionRespuestaOperador`
- `CalificacionAprobado`, `CalificacionDestacado`
- `CalificacionFechaCalificacion`

**Estado:** 🔄 Ruta creada, pendiente implementación

---

### 8. **Operadores** (Tabla: `OperadoresTuristicos`)
**Campos del schema:**
- `OperadorId`
- `OperadorRazonSocial`, `OperadorNombreComercial`
- `OperadorRuc`, `OperadorEmail`, `OperadorTelefono`
- `OperadorDireccion`, `OperadorCiudad`, `OperadorPais`
- `OperadorLogoUrl`, `OperadorSitioWeb`
- `OperadorEstado`, `OperadorFechaRegistro`

**Tablas relacionadas:**
- `ConfiguracionPagos` - Configuración jerárquica de pagos
- `UsuariosOperador` - Empleados del operador

**Estado:** 🔄 Ruta creada, pendiente implementación

---

### 9. **Sedes** (Tabla: `Sedes`)
**Campos del schema:**
- `SedeId`, `OperadorId`
- `SedeCodigo`, `SedeNombre`
- `SedeCiudad`, `SedePais`, `SedeDireccion`
- `SedeTelefono`, `SedeEmail`
- `SedeEsPrincipal`, `SedeEstado`

**Tablas relacionadas:**
- `ConfiguracionFacturacionSede` - Facturación electrónica
- `Comprobantes` - Series y numeración
- `UsuarioSedes` - Asignación de usuarios a sedes

**Estado:** 🔄 Ruta creada, pendiente implementación

---

### 10. **Reportes**
**Tablas relacionadas:**
- `Auditoria` - Registro de operaciones críticas
- `Notificaciones` - Notificaciones del sistema

**Estado:** 🔄 Ruta creada, pendiente implementación

---

## 📋 Otras Entidades del Schema (No en Sidebar)

### **Roles y Permisos (RBAC)**
- `Roles` - Roles del sistema
- `Permisos` - Permisos granulares
- `RolPermisos` - Plantillas de permisos
- `UsuarioPermisos` - Permisos directos por usuario

### **Categorías**
- `Categorias` - Categorías de tours
- `TourCategorias` - Relación N:N

### **Cancelaciones**
- `CancelacionesReserva` - Cancelaciones con penalidades

---

## 🎯 Próximos Pasos

1. **Implementar Pagos**
   - Vista de lista de pagos por reserva
   - Integración con pasarelas
   - Historial de transacciones

2. **Implementar Cupones**
   - CRUD de cupones
   - Validación de uso
   - Estadísticas de uso

3. **Implementar Calificaciones**
   - Vista de reviews por tour
   - Moderación de comentarios
   - Respuestas del operador

4. **Implementar Operadores**
   - Gestión multi-tenant
   - Configuración de pagos
   - Usuarios del operador

5. **Implementar Sedes**
   - CRUD de sedes
   - Configuración de facturación
   - Asignación de usuarios

6. **Implementar Reportes**
   - Dashboard de métricas
   - Exportación de datos
   - Auditoría del sistema

---

## ✅ Validación de Datos

Todos los mock data ahora usan **campos reales del DatabaseSchema.cs**:
- ✅ Tours: Campos actualizados con `TourDescripcion`, `TourDificultad`, `TourPuntoEncuentro`, `TourOrdenVisualizacion`
- ✅ Salidas: Usa campos del schema `SalidasTour`
- ✅ Clientes: Usa campos del schema `Clientes`
- ✅ Reservas: Usa campos del schema `Reservas`

**No hay datos inventados** - todo está basado en el schema real del sistema.
