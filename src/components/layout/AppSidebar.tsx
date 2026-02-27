import {
  LayoutDashboard,
  Map,
  CalendarDays,
  BookOpen,
  Users,
  CreditCard,
  Building2,
  Settings,
  BarChart3,
  Globe,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import logoPurio from "@/assets/logo-purio.png";
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

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Tours", url: "/tours", icon: Map },
  { title: "Salidas", url: "/salidas", icon: CalendarDays },
  { title: "Reservas", url: "/reservas", icon: BookOpen },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Pagos", url: "/pagos", icon: CreditCard },
];

const configItems = [
  { title: "Operadores", url: "/operadores", icon: Building2 },
  { title: "Sedes", url: "/sedes", icon: Globe },
  { title: "Reportes", url: "/reportes", icon: BarChart3 },
  { title: "Configuración", url: "/configuracion", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-5 py-6">
        <div className="flex items-center justify-center">
          <img
            src={logoPurio}
            alt="Purio Travel"
            className="h-14 w-auto"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2">
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => {
                const isActive = location.pathname === item.url || (item.url !== "/" && location.pathname.startsWith(item.url));
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
                          ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-sm' : 'text-sidebar-foreground'}
                        `}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                        )}
                        <item.icon className="h-4 w-4" strokeWidth={isActive ? 2.5 : 2} />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2">
            Gestión
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {configItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`
                          relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                          transition-all duration-200
                          hover:bg-sidebar-accent
                          ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-sm' : 'text-sidebar-foreground'}
                        `}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                        )}
                        <item.icon className="h-4 w-4" strokeWidth={isActive ? 2.5 : 2} />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors duration-200 cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 text-xs font-semibold text-sidebar-primary-foreground shadow-sm">
              AM
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium text-sidebar-foreground truncate">Admin Master</span>
              <span className="text-xs text-sidebar-foreground/50 truncate">admin@purio.pe</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 text-xs font-semibold text-sidebar-primary-foreground shadow-sm cursor-pointer">
              AM
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
