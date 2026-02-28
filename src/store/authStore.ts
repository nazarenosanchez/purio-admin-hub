import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipos basados en DatabaseSchema.cs: UsuariosOperador, Roles, Sedes, Permisos
export interface Usuario {
  usuarioId: number;
  operadorId: number;
  rolId: number;
  sedePrincipalId: number;
  usuarioEmail: string;
  usuarioNombre: string;
  usuarioApellido: string;
  usuarioTelefono?: string;
  usuarioDocumentoTipo?: string;
  usuarioDocumentoNumero?: string;
  usuarioEstado: string;
}

export interface Operador {
  operadorId: number;
  operadorRazonSocial: string;
  operadorNombreComercial: string;
  operadorRuc: string;
  operadorLogoUrl?: string;
  operadorEstado: string;
}

export interface Sede {
  sedeId: number;
  operadorId: number;
  sedeCodigo: string;
  sedeNombre: string;
  sedeCiudad: string;
  sedePais: string;
  sedeEsPrincipal: boolean;
  sedeEstado: string;
}

export interface Rol {
  rolId: number;
  rolCodigo: string;
  rolNombre: string;
}

export type PermisoCode =
  | 'dashboard.ver'
  | 'tours.ver' | 'tours.crear' | 'tours.editar' | 'tours.eliminar'
  | 'salidas.ver' | 'salidas.crear' | 'salidas.editar'
  | 'reservas.ver' | 'reservas.crear' | 'reservas.editar' | 'reservas.cancelar'
  | 'clientes.ver' | 'clientes.crear' | 'clientes.editar'
  | 'pagos.ver' | 'pagos.crear'
  | 'cupones.ver' | 'cupones.crear' | 'cupones.editar'
  | 'calificaciones.ver' | 'calificaciones.responder'
  | 'reportes.ventas' | 'reportes.ocupacion' | 'reportes.financieros'
  | 'config.facturacion' | 'config.usuarios' | 'config.sedes'
  | 'usuarios.ver' | 'usuarios.crear' | 'usuarios.editar';

interface AuthState {
  isAuthenticated: boolean;
  usuario: Usuario | null;
  operador: Operador | null;
  rol: Rol | null;
  sedesPermitidas: Sede[];
  sedeActiva: Sede | null;
  permisos: PermisoCode[];
  token: string | null;

  // Actions
  login: (data: {
    usuario: Usuario;
    operador: Operador;
    rol: Rol;
    sedesPermitidas: Sede[];
    permisos: PermisoCode[];
    token: string;
  }) => void;
  seleccionarSede: (sede: Sede) => void;
  logout: () => void;
  tienePermiso: (permiso: PermisoCode) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      usuario: null,
      operador: null,
      rol: null,
      sedesPermitidas: [],
      sedeActiva: null,
      permisos: [],
      token: null,

      login: (data) => {
        const sedePrincipal = data.sedesPermitidas.find(
          (s) => s.sedeId === data.usuario.sedePrincipalId
        ) || data.sedesPermitidas[0] || null;

        set({
          isAuthenticated: true,
          usuario: data.usuario,
          operador: data.operador,
          rol: data.rol,
          sedesPermitidas: data.sedesPermitidas,
          sedeActiva: data.sedesPermitidas.length === 1 ? sedePrincipal : null,
          permisos: data.permisos,
          token: data.token,
        });
      },

      seleccionarSede: (sede) => {
        set({ sedeActiva: sede });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          usuario: null,
          operador: null,
          rol: null,
          sedesPermitidas: [],
          sedeActiva: null,
          permisos: [],
          token: null,
        });
      },

      tienePermiso: (permiso) => {
        return get().permisos.includes(permiso);
      },
    }),
    {
      name: 'purio-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        usuario: state.usuario,
        operador: state.operador,
        rol: state.rol,
        sedesPermitidas: state.sedesPermitidas,
        sedeActiva: state.sedeActiva,
        permisos: state.permisos,
        token: state.token,
      }),
    }
  )
);
