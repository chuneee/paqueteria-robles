# 📖 Guía de Migración de Vistas Existentes

Esta guía te ayudará a migrar tus vistas existentes al nuevo sistema de rutas y arquitectura.

---

## 🎯 Estado Actual

Actualmente tienes estas vistas implementadas:

```
src/views/
├── EmpresaDashboard.tsx         ✅ Existe (con prop onLogout)
├── SuperAdminDashboard.tsx      ✅ Existe (con prop onLogout)  
├── AdminDashboard.tsx           ✅ Existe (con prop onLogout)
├── LandingPage.tsx              ✅ Creada (nueva arquitectura)
├── LoginPage.tsx                ✅ Creada (nueva arquitectura)
└── empresa/
    ├── GenerarGuiaView.tsx      ✅ Existe
    ├── HistorialGuiasView.tsx   ✅ Existe
    ├── MisClientesView.tsx      ✅ Existe
    ├── SolicitarGuiasView.tsx   ✅ Existe
    └── PerfilConfiguracionView.tsx  ✅ Existe
```

---

## 📝 Nota sobre Router Actual

**Importante:** El router actual (`src/router/index.tsx`) usa **placeholders temporales** para las vistas existentes. Esto es intencional para que el build funcione mientras migras tus componentes.

```typescript
// PLACEHOLDERS TEMPORALES en router/index.tsx
const EmpresaDashboard = () => <div>Empresa Dashboard - Migrar con useAuth</div>;
const SuperAdminDashboard = () => <div>SuperAdmin Dashboard - Migrar con useAsync</div>;
// etc...
```

Estos placeholders serán reemplazados cuando actualices cada vista.

---

## 🔄 Pasos para Migrar Cada Vista

### Paso 1: Eliminar Props de onLogout

Tus vistas actuales reciben `onLogout` como prop. Con el nuevo sistema, usarás el hook `useAuth`.

**ANTES:**
```typescript
// src/views/EmpresaDashboard.tsx
interface EmpresaDashboardProps {
  onLogout: () => void;
}

export function EmpresaDashboard({ onLogout }: EmpresaDashboardProps) {
  // ...
  return (
    <div>
      <Header onLogout={onLogout} />
      {/* ... */}
    </div>
  );
}
```

**DESPUÉS:**
```typescript
// src/views/EmpresaDashboard.tsx
import { useAuth } from '@/hooks';

export default function EmpresaDashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div className="p-6">
      <h1>Bienvenido, {user?.name}</h1>
      {/* Tu contenido existente */}
    </div>
  );
}
```

### Paso 2: Cambiar export function a export default

```typescript
// ANTES
export function EmpresaDashboard({ onLogout }: EmpresaDashboardProps) {

// DESPUÉS  
export default function EmpresaDashboard() {
```

### Paso 3: Remover Header/Sidebar (ya están en Layout)

Con el nuevo sistema de Layouts, no necesitas incluir Header/Sidebar en cada vista.

**ANTES:**
```typescript
export function EmpresaDashboard({ onLogout }: EmpresaDashboardProps) {
  return (
    <div>
      <Header onLogout={onLogout} />
      <Sidebar />
      <div className="content">
        {/* Tu contenido */}
      </div>
    </div>
  );
}
```

**DESPUÉS:**
```typescript
export default function EmpresaDashboard() {
  // Layout ya incluye Header y Sidebar
  return (
    <div className="p-6">
      {/* Solo tu contenido */}
    </div>
  );
}
```

### Paso 4: Actualizar router/index.tsx

Después de migrar una vista, actualiza el import en `src/router/index.tsx`:

```typescript
// ANTES (placeholder)
const EmpresaDashboard = () => <div>Empresa Dashboard - Migrar</div>;

// DESPUÉS (vista real)
import EmpresaDashboard from '@/views/EmpresaDashboard';
```

---

## 📋 Checklist de Migración

### Vistas de Empresa

#### EmpresaDashboard.tsx
```diff
- export function EmpresaDashboard({ onLogout }: EmpresaDashboardProps)
+ export default function EmpresaDashboard()

- import { Sidebar, Header } from "../components/empresa/shared";
+ import { useAuth } from '@/hooks';

- return (
-   <div>
-     <Header onLogout={onLogout} />
-     <Sidebar />
-     <main>{/* contenido */}</main>
-   </div>
- );
+ return (
+   <div className="p-6">
+     {/* solo contenido, sin Header/Sidebar */}
+   </div>
+ );
```

- [ ] Remover prop `onLogout`
- [ ] Agregar `export default`
- [ ] Importar `useAuth` si necesitas datos del usuario
- [ ] Remover `<Header />` y `<Sidebar />` (están en Layout)
- [ ] Actualizar import en `router/index.tsx`

#### GenerarGuiaView.tsx
```diff
- export function GenerarGuiaView()
+ export default function GenerarGuiaView()
```

- [ ] Cambiar a `export default`
- [ ] Actualizar import en `router/index.tsx`

#### HistorialGuiasView.tsx
- [ ] Cambiar a `export default`  
- [ ] Actualizar import en `router/index.tsx`

#### MisClientesView.tsx
- [ ] Cambiar a `export default`
- [ ] Actualizar import en `router/index.tsx`

#### SolicitarGuiasView.tsx
- [ ] Cambiar a `export default`
- [ ] Actualizar import en `router/index.tsx`

#### PerfilConfiguracionView.tsx
- [ ] Cambiar a `export default`
- [ ] Actualizar import en `router/index.tsx`

### Vistas de SuperAdmin

#### SuperAdminDashboard.tsx
- [ ] Remover prop `onLogout`
- [ ] Agregar `export default`
- [ ] Importar `useAuth` o `useAsync`
- [ ] Remover `<Header />` y `<Sidebar />`
- [ ] Actualizar import en `router/index.tsx`

#### EmpresasView.tsx
- [ ] Cambiar a `export default`
- [ ] Actualizar import en `router/index.tsx`

#### EmpresaDetailView.tsx
- [ ] Cambiar a `export default`
- [ ] Usar `useParams()` para obtener ID de ruta
- [ ] Actualizar import en `router/index.tsx`

```typescript
import { useParams } from 'react-router-dom';

export default function EmpresaDetailView() {
  const { id } = useParams<{ id: string }>();
  // Usar id para cargar datos
}
```

#### Otras vistas SuperAdmin
- [ ] GuiasView.tsx → `export default`
- [ ] SolicitudesView.tsx → `export default`
- [ ] CobranzaView.tsx → `export default`
- [ ] AdministradoresView.tsx → `export default`
- [ ] ReportesView.tsx → `export default`
- [ ] NotificacionesView.tsx → `export default`
- [ ] ConfiguracionView.tsx → `export default`

### Vistas de Admin

#### AdminDashboard.tsx
- [ ] Remover prop `onLogout`
- [ ] Agregar `export default`
- [ ] Remover `<Header />`
- [ ] Actualizar import en `router/index.tsx`

---

## 💡 Ejemplo Completo: Migrar EmpresaDashboard

### Archivo Original
```typescript
// src/views/EmpresaDashboard.tsx (ANTES)
import { useState } from "react";
import { Package, FileText } from "lucide-react";
import { Sidebar, Header } from "../components/empresa/shared";

interface EmpresaDashboardProps {
  onLogout: () => void;
}

export function EmpresaDashboard({ onLogout }: EmpresaDashboardProps) {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard Empresa</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tus métricas */}
          </div>
        </main>
      </div>
    </div>
  );
}
```

### Archivo Migrado
```typescript
// src/views/EmpresaDashboard.tsx (DESPUÉS)
import { Package, FileText } from "lucide-react";
import { useAuth } from '@/hooks';

// Cambiar a export default y remover props
export default function EmpresaDashboard() {
  const { user } = useAuth();

  // Header y Sidebar ahora están en EmpresaLayout
  // Solo necesitas el contenido principal
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Bienvenido, {user?.name}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tus métricas */}
        <MetricCard
          title="Guías Activas"
          value="24"
          icon={<Package />}
        />
        <MetricCard
          title="Solicitudes Pendientes"
          value="3"
          icon={<FileText />}
        />
      </div>
    </div>
  );
}
```

### Actualizar Router
```typescript
// src/router/index.tsx
// ANTES
const EmpresaDashboard = () => <div>Empresa Dashboard - Migrar</div>;

// DESPUÉS
import EmpresaDashboard from '@/views/EmpresaDashboard';
```

---

## 🎨 Actualizar Componentes Header y Sidebar

### Header de Empresa

```typescript
// src/components/empresa/shared/Header.tsx
import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/constants';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Paquetería Robles</h1>
      
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}
```

### Sidebar de Empresa

```typescript
// src/components/empresa/shared/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/config/constants';

export function Sidebar() {
  const links = [
    { to: ROUTES.EMPRESA_DASHBOARD, label: 'Dashboard', icon: '📊' },
    { to: ROUTES.GENERAR_GUIA, label: 'Generar Guía', icon: '📦' },
    { to: ROUTES.HISTORIAL_GUIAS, label: 'Historial', icon: '📋' },
    { to: ROUTES.MIS_CLIENTES, label: 'Mis Clientes', icon: '👥' },
    { to: ROUTES.SOLICITAR_GUIAS, label: 'Solicitar Guías', icon: '✉️' },
    { to: ROUTES.PERFIL_CONFIGURACION, label: 'Perfil', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold">Empresa</h2>
      </div>
      
      <nav className="mt-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 border-l-4 border-blue-500' : ''
              }`
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
```

---

## 🚀 Orden Recomendado de Migración

1. **Landing y Login** ✅ (Ya están hechos)
2. **Header y Sidebar** (Actualizar con useAuth y NavLink)
3. **EmpresaDashboard** (Vista principal de empresa)
4. **SuperAdminDashboard** (Vista principal de admin)
5. **Resto de vistas** (Una por una)

---

## ✅ Testing Después de Migrar

Después de migrar cada vista, prueba:

1. Navegación funciona correctamente
2. Layout (Header/Sidebar) se muestra
3. Datos del usuario están disponibles (si usas useAuth)
4. Links activos se marcan correctamente
5. Logout funciona
6. No hay errores en consola

---

## 🆘 Problemas Comunes

### Error: "Cannot find module"
Verifica que hayas cambiado el import en `router/index.tsx`:
```typescript
// Correcto
import EmpresaDashboard from '@/views/EmpresaDashboard';

// Incorrecto (placeholder)
const EmpresaDashboard = () => <div>...</div>;
```

### Error: "onLogout is not defined"
Removiste la prop pero el Header aún la espera. Actualiza el Header para usar `useAuth().logout`.

### Layout no se muestra
Verifica que la ruta esté dentro del Layout correcto en `router/index.tsx`:
```typescript
{
  path: '/empresa',
  element: (
    <ProtectedRoute allowedRoles={[UserRole.EMPRESA]}>
      <EmpresaLayout /> {/* Este layout envuelve todas las rutas hijas */}
    </ProtectedRoute>
  ),
  children: [
    {
      path: 'dashboard',
      element: <EmpresaDashboard /> {/* Vista sin Header/Sidebar */}
    }
  ]
}
```

---

## 📊 Progreso de Migración

Marca cada vista conforme la migres:

### Públicas
- [x] LandingPage
- [x] LoginPage

### Empresa
- [ ] EmpresaDashboard
- [ ] GenerarGuiaView
- [ ] HistorialGuiasView
- [ ] MisClientesView
- [ ] SolicitarGuiasView
- [ ] PerfilConfiguracionView

### SuperAdmin
- [ ] SuperAdminDashboard
- [ ] EmpresasView
- [ ] EmpresaDetailView
- [ ] GuiasView
- [ ] SolicitudesView
- [ ] CobranzaView
- [ ] AdministradoresView
- [ ] ReportesView
- [ ] NotificacionesView
- [ ] ConfiguracionView

### Admin
- [ ] AdminDashboard

---

¡Migra las vistas gradualmente y prueba cada una! 🚀
