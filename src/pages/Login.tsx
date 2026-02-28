import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import type { PermisoCode } from "@/store/authStore";
import logoPurio from "@/assets/logo-purio.png";

// Mock login - simula respuesta del backend
const mockLogin = async (email: string, password: string) => {
  await new Promise((r) => setTimeout(r, 1200));

  if (email === "admin@purio.pe" && password === "admin123") {
    return {
      usuario: {
        usuarioId: 1,
        operadorId: 1,
        rolId: 1,
        sedePrincipalId: 1,
        usuarioEmail: "admin@purio.pe",
        usuarioNombre: "Carlos",
        usuarioApellido: "Mendoza",
        usuarioTelefono: "+51 984 123 456",
        usuarioEstado: "activo",
      },
      operador: {
        operadorId: 1,
        operadorRazonSocial: "Purio Travel S.A.C.",
        operadorNombreComercial: "Purio Travel",
        operadorRuc: "20123456789",
        operadorLogoUrl: null,
        operadorEstado: "activo",
      },
      rol: { rolId: 1, rolCodigo: "ADMIN", rolNombre: "Administrador" },
      sedesPermitidas: [
        {
          sedeId: 1, operadorId: 1, sedeCodigo: "CUSCO-01",
          sedeNombre: "Sede Central Cusco", sedeCiudad: "Cusco",
          sedePais: "Perú", sedeEsPrincipal: true, sedeEstado: "activo",
        },
        {
          sedeId: 2, operadorId: 1, sedeCodigo: "LIMA-01",
          sedeNombre: "Oficina Lima", sedeCiudad: "Lima",
          sedePais: "Perú", sedeEsPrincipal: false, sedeEstado: "activo",
        },
        {
          sedeId: 3, operadorId: 1, sedeCodigo: "AREQUIPA-01",
          sedeNombre: "Sucursal Arequipa", sedeCiudad: "Arequipa",
          sedePais: "Perú", sedeEsPrincipal: false, sedeEstado: "activo",
        },
      ],
      permisos: [
        "dashboard.ver", "tours.ver", "tours.crear", "tours.editar", "tours.eliminar",
        "salidas.ver", "salidas.crear", "salidas.editar",
        "reservas.ver", "reservas.crear", "reservas.editar", "reservas.cancelar",
        "clientes.ver", "clientes.crear", "clientes.editar",
        "pagos.ver", "pagos.crear",
        "cupones.ver", "cupones.crear", "cupones.editar",
        "calificaciones.ver", "calificaciones.responder",
        "reportes.ventas", "reportes.ocupacion", "reportes.financieros",
        "config.facturacion", "config.usuarios", "config.sedes",
        "usuarios.ver", "usuarios.crear", "usuarios.editar",
      ] as PermisoCode[],
      token: "mock-jwt-token-admin",
    };
  }

  if (email === "ventas@purio.pe" && password === "ventas123") {
    return {
      usuario: {
        usuarioId: 2,
        operadorId: 1,
        rolId: 2,
        sedePrincipalId: 1,
        usuarioEmail: "ventas@purio.pe",
        usuarioNombre: "María",
        usuarioApellido: "Torres",
        usuarioEstado: "activo",
      },
      operador: {
        operadorId: 1,
        operadorRazonSocial: "Purio Travel S.A.C.",
        operadorNombreComercial: "Purio Travel",
        operadorRuc: "20123456789",
        operadorLogoUrl: null,
        operadorEstado: "activo",
      },
      rol: { rolId: 2, rolCodigo: "VENDEDOR", rolNombre: "Vendedor" },
      sedesPermitidas: [
        {
          sedeId: 1, operadorId: 1, sedeCodigo: "CUSCO-01",
          sedeNombre: "Sede Central Cusco", sedeCiudad: "Cusco",
          sedePais: "Perú", sedeEsPrincipal: true, sedeEstado: "activo",
        },
      ],
      permisos: [
        "dashboard.ver", "tours.ver",
        "reservas.ver", "reservas.crear",
        "clientes.ver", "clientes.crear",
        "salidas.ver",
      ] as PermisoCode[],
      token: "mock-jwt-token-ventas",
    };
  }

  throw new Error("Credenciales incorrectas");
};

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await mockLogin(email, password);
      login(data);

      // Si tiene más de 1 sede → ir a seleccionar sede
      // Si tiene solo 1 sede → ir directo al dashboard
      if (data.sedesPermitidas.length > 1) {
        navigate("/seleccionar-sede");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-white flex-col justify-center items-center p-12 relative border-r border-gray-200">
        <div className="relative z-10 text-center max-w-sm">
          <img src={logoPurio} alt="Purio" className="h-16 w-auto mx-auto mb-10" />
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-3">
            Panel de Gestión
          </h1>
          <p className="text-[#8C8C8C] leading-relaxed">
            Administra tus tours, reservas, pagos y más desde un solo lugar.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div className="p-3 rounded-xl bg-[#F5F5F5]">
              <div className="text-2xl font-bold text-[#3D3B6E]">24+</div>
              <div className="text-xs text-[#8C8C8C] mt-1">Tours activos</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F5F5]">
              <div className="text-2xl font-bold text-[#3D3B6E]">450+</div>
              <div className="text-xs text-[#8C8C8C] mt-1">Reservas</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F5F5]">
              <div className="text-2xl font-bold text-[#3D3B6E]">98%</div>
              <div className="text-xs text-[#8C8C8C] mt-1">Satisfacción</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img src={logoPurio} alt="Purio" className="h-12 w-auto" />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#2C2C2C]">Iniciar Sesión</h2>
            <p className="text-sm text-[#8C8C8C] mt-1">
              Ingresa a tu panel de administración
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5A5A5A]">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@purio.pe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#5A5A5A]">Contraseña</Label>
                <a href="#" className="text-xs text-[#3D3B6E] hover:text-[#5B5891] transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8C8C] hover:text-[#5A5A5A]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#3D3B6E] hover:bg-[#2A2850] text-white font-semibold"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-[#E8E7F5] rounded-lg border border-[#3D3B6E]/10">
            <p className="text-xs font-medium text-[#3D3B6E] mb-2">Cuentas demo:</p>
            <div className="space-y-1 text-xs text-[#5A5A5A]">
              <div><strong>Admin:</strong> admin@purio.pe / admin123</div>
              <div><strong>Ventas:</strong> ventas@purio.pe / ventas123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
