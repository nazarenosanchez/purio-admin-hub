import {
  Home,
  Map,
  CalendarDays,
  Users,
  CreditCard,
  Settings,
  BarChart3,
  CalendarCheck,
  Building,
  Ticket,
  Star,
  UserCog,
  LogOut,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import logoPurio from "@/assets/logo-purio.png";
import { useAuthStore } from "@/store/authStore";
import type { PermisoCode } from "@/store/authStore";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  permiso?: PermisoCode;
}

const mainItems: NavItem[] = [
  { title: "Dashboard", url: "/", icon: Home, permiso: "dashboard.ver" },
  { title: "Tours", url: "/tours", icon: Map, permiso: "tours.ver" },
  { title: "Salidas", url: "/salidas", icon: CalendarCheck, permiso: "salidas.ver" },
  { title: "Reservas", url: "/reservas", icon: CalendarDays, permiso: "reservas.ver" },
  { title: "Clientes", url: "/clientes", icon: Users, permiso: "clientes.ver" },
];

const finanzasItems: NavItem[] = [
  { title: "Pagos", url: "/pagos", icon: CreditCard, permiso: "pagos.ver" },
  { title: "Cupones", url: "/cupones", icon: Ticket, permiso: "cupones.ver" },
  { title: "Calificaciones", url: "/calificaciones", icon: Star, permiso: "calificaciones.ver" },
];

const adminItems: NavItem[] = [
  { title: "Usuarios", url: "/usuarios", icon: UserCog, permiso: "usuarios.ver" },
  { title: "Sedes", url: "/sedes", icon: Building, permiso: "config.sedes" },
  { title: "Reportes", url: "/reportes", icon: BarChart3, permiso: "reportes.ventas" },
  { title: "Configuración", url: "/configuracion", icon: Settings, permiso: "config.facturacion" },
];

function SidebarNavGroup({ label, items }: { label: string; items: NavItem[] }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { permisos } = useAuthStore();

  const visibleItems = items.filter(
    (item) => !item.permiso || permisos.includes(item.permiso)
  );

  if (visibleItems.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/40 px-3 mb-1">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-0.5">
          {visibleItems.map((item) => {
            const isActive =
              location.pathname === item.url ||
              (item.url !== "/" && location.pathname.startsWith(item.url));
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    end={item.url === "/"}
                    className={`
                      relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-200
                      hover:bg-sidebar-accent
                      ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold' : 'text-sidebar-foreground'}
                    `}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={isActive ? 2.5 : 1.8} />
                    {!collapsed && <span className="text-sm">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const { usuario, operador, sedeActiva, sedesPermitidas, rol, logout } = useAuthStore();

  const initials = usuario
    ? `${usuario.usuarioNombre.charAt(0)}${usuario.usuarioApellido.charAt(0)}`
    : "??";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCambiarSede = () => {
    navigate("/seleccionar-sede");
  };

  return (
    <Sidebar collapsible="icon">
      {/* Header: Logo + Sede activa */}
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4 space-y-3">
        <div className="flex items-center justify-center">
          <img
            src={logoPurio}
            alt={operador?.operadorNombreComercial || "Purio"}
            className="h-12 w-auto"
          />
        </div>

        {/* Sede activa */}
        {!collapsed && sedeActiva && (
          <button
            onClick={handleCambiarSede}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors text-left"
          >
            <MapPin className="h-3.5 w-3.5 text-[#3D3B6E] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-sidebar-foreground truncate">
                {sedeActiva.sedeNombre}
              </div>
              <div className="text-[10px] text-sidebar-foreground/50 truncate">
                {sedeActiva.sedeCiudad} • {sedeActiva.sedeCodigo}
              </div>
            </div>
            {sedesPermitidas.length > 1 && (
              <ChevronDown className="h-3 w-3 text-sidebar-foreground/40 shrink-0" />
            )}
          </button>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavGroup label="Principal" items={mainItems} />
        <SidebarNavGroup label="Finanzas" items={finanzasItems} />
        <SidebarNavGroup label="Administración" items={adminItems} />
      </SidebarContent>

      {/* Footer: Usuario + Logout */}
      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3D3B6E] text-xs font-bold text-white shrink-0">
              {initials}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium text-sidebar-foreground truncate">
                {usuario?.usuarioNombre} {usuario?.usuarioApellido}
              </span>
              <span className="text-[10px] text-sidebar-foreground/50 truncate">
                {rol?.rolNombre} • {usuario?.usuarioEmail}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/40 hover:text-red-500 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3D3B6E] text-xs font-bold text-white cursor-pointer">
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/40 hover:text-red-400 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
