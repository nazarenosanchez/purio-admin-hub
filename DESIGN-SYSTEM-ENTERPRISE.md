# 🎨 Sistema de Diseño Enterprise - Purio Admin Hub

**Inspiración:** Stripe Dashboard, Linear, Vercel, Framer, Notion (modo profesional)  
**Objetivo:** Dashboard SaaS moderno, minimalista, profesional nivel startup unicorn

---

## 🎯 Principios de Diseño

### **1. Minimalismo Potente**
- Menos es más: cada elemento tiene un propósito
- Whitespace generoso (nunca saturado)
- Jerarquía visual clara
- Información progresiva (no todo a la vez)

### **2. Consistencia Absoluta**
- Sistema de espaciado estricto (4px/8px)
- Bordes redondeados consistentes (12px-16px)
- Sombras sutiles y uniformes
- Tipografía con escala clara

### **3. Interactividad Sutil**
- Micro-interacciones pensadas
- Transiciones suaves (200-300ms)
- Hover states elegantes
- Estados de carga refinados

### **4. Profesionalismo Tecnológico**
- Colores sofisticados (no chillones)
- Iconografía limpia (Lucide)
- Datos legibles y escaneables
- Acciones claras y accesibles

---

## 🎨 Paleta de Colores Refinada

### **Colores Base Purio (Actualizados)**

```css
/* PRIMARY - Morado Profundo (más sofisticado) */
--primary-50: 250 245 255;     /* Muy claro */
--primary-100: 243 232 255;    /* Claro */
--primary-200: 233 213 255;    /* Medio claro */
--primary-300: 216 180 254;    /* Medio */
--primary-400: 192 132 252;    /* Medio oscuro */
--primary-500: 168 85 247;     /* Base */
--primary-600: 147 51 234;     /* Oscuro */
--primary-700: 126 34 206;     /* Más oscuro */
--primary-800: 107 33 168;     /* Muy oscuro */
--primary-900: 88 28 135;      /* Ultra oscuro */

/* ACCENT - Turquesa/Cyan (más vibrante pero controlado) */
--accent-50: 236 254 255;      /* Muy claro */
--accent-100: 207 250 254;     /* Claro */
--accent-200: 165 243 252;     /* Medio claro */
--accent-300: 103 232 249;     /* Medio */
--accent-400: 34 211 238;      /* Medio oscuro */
--accent-500: 6 182 212;       /* Base - Turquesa principal */
--accent-600: 8 145 178;       /* Oscuro */
--accent-700: 14 116 144;      /* Más oscuro */
--accent-800: 21 94 117;       /* Muy oscuro */
--accent-900: 22 78 99;        /* Ultra oscuro */

/* NEUTRAL - Grises sofisticados (más refinados) */
--neutral-50: 250 250 250;     /* Casi blanco */
--neutral-100: 245 245 245;    /* Muy claro */
--neutral-200: 229 229 229;    /* Claro */
--neutral-300: 212 212 212;    /* Medio claro */
--neutral-400: 163 163 163;    /* Medio */
--neutral-500: 115 115 115;    /* Base */
--neutral-600: 82 82 82;       /* Oscuro */
--neutral-700: 64 64 64;       /* Más oscuro */
--neutral-800: 38 38 38;       /* Muy oscuro */
--neutral-900: 23 23 23;       /* Ultra oscuro */
```

### **Colores Semánticos**

```css
/* SUCCESS - Verde sofisticado */
--success-50: 240 253 244;
--success-500: 34 197 94;      /* Base */
--success-600: 22 163 74;      /* Oscuro */
--success-700: 21 128 61;      /* Más oscuro */

/* WARNING - Ámbar elegante */
--warning-50: 255 251 235;
--warning-500: 245 158 11;     /* Base */
--warning-600: 217 119 6;      /* Oscuro */
--warning-700: 180 83 9;       /* Más oscuro */

/* ERROR - Rojo refinado */
--error-50: 254 242 242;
--error-500: 239 68 68;        /* Base */
--error-600: 220 38 38;        /* Oscuro */
--error-700: 185 28 28;        /* Más oscuro */

/* INFO - Azul tecnológico */
--info-50: 239 246 255;
--info-500: 59 130 246;        /* Base */
--info-600: 37 99 235;         /* Oscuro */
--info-700: 29 78 216;         /* Más oscuro */
```

### **Aplicación de Colores**

| Elemento | Color | Uso |
|----------|-------|-----|
| **Botón Primario** | `primary-600` | Acciones principales |
| **Botón Secundario** | `accent-500` | Acciones secundarias importantes |
| **Enlaces** | `accent-600` | Links, navegación |
| **Texto Principal** | `neutral-900` | Headings, texto importante |
| **Texto Secundario** | `neutral-600` | Descripciones, labels |
| **Texto Terciario** | `neutral-500` | Placeholders, hints |
| **Bordes** | `neutral-200` | Divisores, cards |
| **Fondos** | `neutral-50` | Background principal |
| **Superficie** | `white` | Cards, modales |

---

## 📝 Tipografía Enterprise

### **Fuentes**

```css
/* Headings - Geist o Inter (más moderno que Plus Jakarta Sans) */
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Body - Inter */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - Para códigos */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### **Escala Tipográfica**

```css
/* Display - Para títulos de página principales */
--text-display: 2.25rem;       /* 36px */
--text-display-weight: 700;
--text-display-line-height: 1.2;
--text-display-letter-spacing: -0.02em;

/* H1 - Títulos de sección */
--text-h1: 1.875rem;           /* 30px */
--text-h1-weight: 700;
--text-h1-line-height: 1.3;
--text-h1-letter-spacing: -0.01em;

/* H2 - Subtítulos */
--text-h2: 1.5rem;             /* 24px */
--text-h2-weight: 600;
--text-h2-line-height: 1.4;

/* H3 - Card titles */
--text-h3: 1.125rem;           /* 18px */
--text-h3-weight: 600;
--text-h3-line-height: 1.5;

/* Body Large */
--text-lg: 1rem;               /* 16px */
--text-lg-weight: 400;
--text-lg-line-height: 1.6;

/* Body */
--text-base: 0.875rem;         /* 14px */
--text-base-weight: 400;
--text-base-line-height: 1.5;

/* Small */
--text-sm: 0.8125rem;          /* 13px */
--text-sm-weight: 400;
--text-sm-line-height: 1.4;

/* Extra Small */
--text-xs: 0.75rem;            /* 12px */
--text-xs-weight: 500;
--text-xs-line-height: 1.3;
--text-xs-letter-spacing: 0.01em;
```

### **Jerarquía de Peso**

- **Regular (400):** Texto de cuerpo
- **Medium (500):** Labels, badges, navegación
- **Semibold (600):** Subtítulos, card titles
- **Bold (700):** Títulos principales, números importantes

---

## 📐 Sistema de Espaciado

### **Escala Base: 4px**

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

### **Aplicación de Espaciado**

| Elemento | Espaciado | Uso |
|----------|-----------|-----|
| **Card Padding** | `space-6` (24px) | Interior de cards |
| **Section Gap** | `space-8` (32px) | Entre secciones |
| **Grid Gap** | `space-4` (16px) | Entre cards en grid |
| **Stack Gap** | `space-3` (12px) | Entre elementos verticales |
| **Inline Gap** | `space-2` (8px) | Entre elementos inline |
| **Page Padding** | `space-6` a `space-8` | Márgenes de página |

---

## 🔲 Bordes y Radios

### **Border Radius**

```css
--radius-none: 0;
--radius-sm: 0.375rem;    /* 6px - Inputs pequeños */
--radius-md: 0.5rem;      /* 8px - Inputs, badges */
--radius-lg: 0.75rem;     /* 12px - Cards, botones */
--radius-xl: 1rem;        /* 16px - Cards grandes */
--radius-2xl: 1.5rem;     /* 24px - Modales */
--radius-full: 9999px;    /* Círculos, pills */
```

### **Aplicación**

- **Cards:** `radius-xl` (16px)
- **Botones:** `radius-lg` (12px)
- **Inputs:** `radius-md` (8px)
- **Badges:** `radius-md` (8px)
- **Modales:** `radius-2xl` (24px)
- **Avatares:** `radius-full`

### **Bordes**

```css
--border-width: 1px;
--border-color: var(--neutral-200);
--border-color-hover: var(--neutral-300);
--border-color-focus: var(--accent-500);
```

---

## 🌑 Sombras Sutiles (Elevación)

### **Sistema de Sombras**

```css
/* Ninguna - Elementos planos */
--shadow-none: none;

/* XS - Hover sutil */
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* SM - Cards en reposo */
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1),
             0 1px 2px -1px rgb(0 0 0 / 0.1);

/* MD - Cards hover, dropdowns */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
             0 2px 4px -2px rgb(0 0 0 / 0.1);

/* LG - Modales, popovers */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
             0 4px 6px -4px rgb(0 0 0 / 0.1);

/* XL - Modales grandes */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
             0 8px 10px -6px rgb(0 0 0 / 0.1);

/* Colored - Para elementos con color de fondo */
--shadow-primary: 0 4px 14px 0 rgb(168 85 247 / 0.15);
--shadow-accent: 0 4px 14px 0 rgb(6 182 212 / 0.15);
--shadow-success: 0 4px 14px 0 rgb(34 197 94 / 0.15);
```

### **Aplicación de Sombras**

| Elemento | Sombra | Estado |
|----------|--------|--------|
| **Card** | `shadow-sm` | Reposo |
| **Card Hover** | `shadow-md` | Hover |
| **Dropdown** | `shadow-lg` | Abierto |
| **Modal** | `shadow-xl` | Abierto |
| **Botón Primario** | `shadow-primary` | Reposo |
| **Botón Hover** | `shadow-md` | Hover |

---

## 🎭 Componentes Rediseñados

### **1. StatCard (KPI Card)**

**Antes:** Cards básicas con iconos
**Después:** Cards premium con:
- Gradientes sutiles en fondo
- Sombras suaves
- Hover state con elevación
- Iconos con fondo degradado
- Números más prominentes
- Tendencias con micro-gráficos

```tsx
// Características:
- Border radius: 16px
- Padding: 24px
- Shadow: shadow-sm (reposo) → shadow-md (hover)
- Transición: 200ms ease
- Gradiente sutil en fondo (opcional)
- Icono con gradiente de color
```

### **2. DataTable (Tablas)**

**Antes:** Tablas con bordes visibles
**Después:** Tablas estilo Linear:
- Sin bordes verticales
- Separadores horizontales sutiles (1px, neutral-200)
- Hover row con fondo suave (neutral-50)
- Padding generoso (16px vertical)
- Headers con texto pequeño y uppercase
- Acciones con menú contextual elegante

```tsx
// Características:
- Header: text-xs, uppercase, tracking-wide, neutral-600
- Row padding: 16px vertical
- Row hover: bg-neutral-50, transition 150ms
- Border: 1px solid neutral-200 (solo horizontal)
- Cell spacing: 12px horizontal
```

### **3. Badges (Estados)**

**Antes:** Badges con bordes
**Después:** Badges refinados:
- Sin bordes (solo fondo con opacidad)
- Texto medium weight
- Padding: 4px 12px
- Border radius: 8px
- Colores con opacidad 10-15%

```tsx
// Ejemplos:
- Confirmada: bg-success-50, text-success-700
- Pendiente: bg-warning-50, text-warning-700
- Cancelada: bg-error-50, text-error-700
- Completada: bg-info-50, text-info-700
```

### **4. Botones**

**Antes:** Botones estándar
**Después:** Botones premium:
- Primary: Gradiente sutil, sombra colored
- Secondary: Outline refinado
- Ghost: Hover con fondo suave
- Transiciones suaves (200ms)
- Estados de loading elegantes

```tsx
// Primary Button:
- Background: primary-600
- Hover: primary-700
- Shadow: shadow-primary
- Transition: all 200ms ease
- Font weight: 500

// Secondary Button:
- Background: transparent
- Border: 1.5px solid neutral-300
- Hover: bg-neutral-50
- Transition: all 200ms ease
```

### **5. Inputs**

**Antes:** Inputs básicos
**Después:** Inputs refinados:
- Border: 1.5px (más visible)
- Focus ring: accent-500 con opacidad
- Padding: 10px 14px
- Border radius: 8px
- Placeholder más suave

```tsx
// Características:
- Border: 1.5px solid neutral-300
- Focus: border-accent-500, ring-4 ring-accent-500/10
- Padding: 10px 14px
- Font size: 14px
- Placeholder: neutral-500
```

---

## 📊 Gráficos (Recharts)

### **Estilo de Gráficos**

```tsx
// Características:
- Colores: accent-500 (principal), primary-600 (secundario)
- Grid: neutral-200, strokeDasharray="3 3"
- Tooltip: shadow-lg, border-radius 12px
- Gradientes sutiles en áreas
- Ejes con texto neutral-600, 12px
```

### **Paleta para Gráficos**

```tsx
const chartColors = {
  primary: 'hsl(168 85 247)',      // Morado
  secondary: 'hsl(6 182 212)',     // Turquesa
  tertiary: 'hsl(34 197 94)',      // Verde
  quaternary: 'hsl(245 158 11)',   // Ámbar
  quinary: 'hsl(59 130 246)',      // Azul
};
```

---

## 🎨 Sidebar Rediseñado

### **Características**

- **Fondo:** Morado muy oscuro (`neutral-900` o `primary-900`)
- **Texto:** `neutral-300` (inactivo), `white` (activo)
- **Hover:** Fondo `primary-800/50`
- **Activo:** Fondo `accent-600`, texto `white`, indicador lateral
- **Padding:** 12px items, 24px secciones
- **Iconos:** 20px, alineados perfectamente

### **Estados**

```tsx
// Inactivo:
- Color: neutral-400
- Background: transparent

// Hover:
- Color: neutral-200
- Background: primary-800/30

// Activo:
- Color: white
- Background: accent-600
- Border-left: 3px solid accent-400
- Font-weight: 500
```

---

## 🎯 Micro-interacciones

### **Transiciones Estándar**

```css
/* Rápida - Hover, focus */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* Normal - Cambios de estado */
--transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* Lenta - Modales, slides */
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Bounce - Elementos que aparecen */
--transition-bounce: 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### **Animaciones**

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide In */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

/* Scale In */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

---

## ✅ Checklist de Implementación

### **Fase 1: Fundamentos**
- [ ] Actualizar variables CSS con nueva paleta
- [ ] Cambiar fuente a Inter (heading y body)
- [ ] Implementar sistema de espaciado 4px/8px
- [ ] Actualizar border radius a 12px-16px
- [ ] Implementar sombras sutiles

### **Fase 2: Componentes Base**
- [ ] Rediseñar StatCard con gradientes
- [ ] Rediseñar Badges sin bordes
- [ ] Rediseñar Botones con sombras colored
- [ ] Rediseñar Inputs con focus ring
- [ ] Actualizar tipografía en todos los componentes

### **Fase 3: Layouts**
- [ ] Rediseñar Sidebar con nuevo estilo
- [ ] Mejorar Header con search refinado
- [ ] Actualizar espaciado de página

### **Fase 4: Pantallas**
- [ ] Rediseñar Dashboard con nueva jerarquía
- [ ] Rediseñar tabla de Tours estilo Linear
- [ ] Rediseñar tabla de Reservas
- [ ] Mejorar gráficos con nueva paleta

### **Fase 5: Detalles**
- [ ] Implementar micro-interacciones
- [ ] Añadir loading states elegantes
- [ ] Añadir empty states
- [ ] Optimizar responsive

---

## 🚀 Resultado Esperado

### **Antes:**
- Diseño funcional pero básico
- Colores estándar
- Espaciado inconsistente
- Sombras pesadas
- Tipografía genérica

### **Después:**
- Diseño enterprise premium
- Paleta sofisticada y consistente
- Espaciado generoso y uniforme
- Sombras sutiles y elegantes
- Tipografía moderna y legible
- Micro-interacciones pulidas
- Sensación de producto unicorn

---

**Sistema de diseño creado para elevar Purio Admin Hub a nivel enterprise** 🚀
