import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Tours from "./pages/Tours";
import Reservas from "./pages/Reservas";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/salidas" element={<ComingSoon title="Salidas" />} />
            <Route path="/clientes" element={<ComingSoon title="Clientes" />} />
            <Route path="/pagos" element={<ComingSoon title="Pagos" />} />
            <Route path="/operadores" element={<ComingSoon title="Operadores" />} />
            <Route path="/sedes" element={<ComingSoon title="Sedes" />} />
            <Route path="/reportes" element={<ComingSoon title="Reportes" />} />
            <Route path="/configuracion" element={<ComingSoon title="Configuración" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
