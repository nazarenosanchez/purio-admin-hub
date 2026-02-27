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
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <div className="flex items-center gap-3">
          <img
            src={logoPurio}
            alt="Purio Travel"
            className="h-9 w-auto shrink-0 brightness-0 invert"
          />
          {!collapsed && (
            <span className="text-xs text-sidebar-foreground/60">
              Panel Admin
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-medium text-sidebar-accent-foreground">
              AM
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-sidebar-foreground">Admin Master</span>
              <span className="text-[10px] text-sidebar-foreground/50">admin@purio.pe</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
