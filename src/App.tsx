import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { useAuthStore } from "./store/authStore";
import Login from "./pages/Login";
import SeleccionarSede from "./pages/SeleccionarSede";
import Dashboard from "./pages/Dashboard";
import Tours from "./pages/Tours";
import Reservas from "./pages/Reservas";
import Salidas from "./pages/Salidas";
import Clientes from "./pages/Clientes";
import Pagos from "./pages/Pagos";
import Cupones from "./pages/Cupones";
import Calificaciones from "./pages/Calificaciones";
import Sedes from "./pages/Sedes";
import TourNuevo from "./pages/TourNuevo";
import SalidaNueva from "./pages/SalidaNueva";
import Usuarios from "./pages/Usuarios";
import SedeNueva from "./pages/SedeNueva";
import UsuarioNuevo from "./pages/UsuarioNuevo";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, sedeActiva } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!sedeActiva) {
    return <Navigate to="/seleccionar-sede" replace />;
  }

  return <>{children}</>;
}

function SedeGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Auth required, no sede required */}
          <Route
            path="/seleccionar-sede"
            element={<SedeGuard><SeleccionarSede /></SedeGuard>}
          />

          {/* Protected: auth + sede required */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/nuevo" element={<TourNuevo />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/salidas" element={<Salidas />} />
            <Route path="/salidas/nueva" element={<SalidaNueva />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/cupones" element={<Cupones />} />
            <Route path="/calificaciones" element={<Calificaciones />} />
            <Route path="/sedes" element={<Sedes />} />
            <Route path="/sedes/nueva" element={<SedeNueva />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/nuevo" element={<UsuarioNuevo />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
