import { useNavigate } from "react-router-dom";
import { Building, MapPin, Star, ArrowRight, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import logoPurio from "@/assets/logo-purio.png";

export default function SeleccionarSede() {
  const navigate = useNavigate();
  const { sedesPermitidas, operador, usuario, seleccionarSede, logout } = useAuthStore();

  const handleSeleccionarSede = (sede: typeof sedesPermitidas[0]) => {
    seleccionarSede(sede);
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header limpio */}
      <div className="bg-white border-b border-gray-200 py-3 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <img src={logoPurio} alt="Purio" className="h-8 w-auto" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#5A5A5A]">
              {usuario?.usuarioNombre} {usuario?.usuarioApellido}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-[#8C8C8C] hover:text-red-500 h-8 w-8 p-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-10">
            <div className="h-14 w-14 rounded-2xl bg-[#E8E7F5] flex items-center justify-center mx-auto mb-4">
              <Building className="h-7 w-7 text-[#3D3B6E]" />
            </div>
            <h1 className="text-2xl font-bold text-[#2C2C2C]">
              Selecciona una Sede
            </h1>
            <p className="text-sm text-[#8C8C8C] mt-2">
              {operador?.operadorNombreComercial} — Elige la sede en la que vas a trabajar
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sedesPermitidas.map((sede) => (
              <Card
                key={sede.sedeId}
                className="border border-gray-200 hover:border-[#3D3B6E] hover:shadow-md transition-all duration-200 cursor-pointer group bg-white"
                onClick={() => handleSeleccionarSede(sede)}
              >
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-xl bg-[#E8E7F5] flex items-center justify-center group-hover:bg-[#3D3B6E] transition-colors">
                      <Building className="h-5 w-5 text-[#3D3B6E] group-hover:text-white transition-colors" />
                    </div>
                    {sede.sedeEsPrincipal && (
                      <Badge variant="outline" className="bg-[#E8E7F5] text-[#3D3B6E] border-[#3D3B6E]/20 text-[10px] px-2">
                        <Star className="h-3 w-3 mr-1" />
                        Principal
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-[#2C2C2C]">
                      {sede.sedeNombre}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-[#8C8C8C]">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{sede.sedeCiudad}, {sede.sedePais}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs font-mono text-[#8C8C8C]">
                      {sede.sedeCodigo}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#3D3B6E] transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
