# Ejemplo de Integración: Actualizar Login Existente

Este documento muestra cómo actualizar tu componente `Login` actual para usar el nuevo sistema de autenticación.

## 📋 Componente Login Actual

Tu componente actual probablemente se ve así:

```typescript
// src/components/auth/Login.tsx (ANTES)
export function Login({ onLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de login
    onLogin('empresa'); // o 'superadmin'
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {/* ... form fields ... */}
      </form>
    </div>
  );
}
```

## ✅ Componente Login Actualizado

Aquí está cómo actualizarlo para usar el sistema real de autenticación:

```typescript
// src/components/auth/Login.tsx (DESPUÉS)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useToast } from '@/hooks';
import { ROUTES } from '@/config/constants';
import { UserRole } from '@/types';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Llamar al servicio de autenticación real
      await login({ email, password });
      
      showSuccess('Inicio de sesión exitoso');
      
      // Obtener el usuario del storage para redirigir según rol
      const { storage } = await import('@/utils/storage');
      const user = storage.getUserData<any>();
      
      // Redirigir según el rol del usuario
      if (user?.role === UserRole.SUPERADMIN) {
        navigate(ROUTES.SUPERADMIN_DASHBOARD);
      } else if (user?.role === UserRole.EMPRESA) {
        navigate(ROUTES.EMPRESA_DASHBOARD);
      } else if (user?.role === UserRole.ADMIN) {
        navigate(ROUTES.ADMIN_DASHBOARD);
      }
    } catch (error: any) {
      showError(error.message || 'Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Iniciar Sesión
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a 
            href={ROUTES.HOME}
            className="text-sm text-blue-600 hover:underline"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
```

## 🔄 Actualizar Navigation.tsx

Si tu componente `Navigation` tiene un botón de login, actualízalo así:

```typescript
// src/components/Navigation.tsx (ANTES)
export function Navigation({ onLoginClick }) {
  return (
    <nav>
      <button onClick={onLoginClick}>Iniciar Sesión</button>
    </nav>
  );
}

// src/components/Navigation.tsx (DESPUÉS)
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { ROUTES } from '@/config/constants';

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="logo">
        <Link to={ROUTES.HOME}>Paquetería Robles</Link>
      </div>

      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <span>Hola, {user?.name}</span>
            <button onClick={logout}>Cerrar Sesión</button>
          </>
        ) : (
          <Link to={ROUTES.LOGIN}>Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
}
```

## 🎨 Actualizar las Vistas de Dashboard

### EmpresaDashboard

```typescript
// src/views/EmpresaDashboard.tsx (ANTES)
export function EmpresaDashboard({ onLogout }) {
  return (
    <div>
      <Header onLogout={onLogout} />
      {/* ... */}
    </div>
  );
}

// src/views/EmpresaDashboard.tsx (DESPUÉS)
import { useAuth } from '@/hooks';
import { Header } from '@/components/empresa/shared/Header';

export default function EmpresaDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Bienvenido, {user?.name}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tus métricas y contenido */}
      </div>
    </div>
  );
}
```

### SuperAdminDashboard

```typescript
// src/views/SuperAdminDashboard.tsx (DESPUÉS)
import { useAsync } from '@/hooks';
import { superAdminService } from '@/services';

export default function SuperAdminDashboard() {
  const { data: stats, isLoading } = useAsync(
    () => superAdminService.getDashboardStats(),
    { immediate: true }
  );

  if (isLoading) {
    return <div>Cargando estadísticas...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard SuperAdmin</h1>
      
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Total Empresas"
          value={stats?.totalEmpresas}
        />
        <MetricCard
          title="Total Guías"
          value={stats?.totalGuias}
        />
        {/* Más métricas... */}
      </div>
    </div>
  );
}
```

## 🔧 Actualizar Header y Sidebar

### Header con Logout

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

### Sidebar con Links

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
              `flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors ${
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

## 🚀 Testing del Sistema

### 1. Probar Login (Sin Backend Real)

Si no tienes el backend listo, puedes simular el login temporalmente:

```typescript
// src/services/auth.service.ts (TEMPORAL - SOLO PARA TESTING)
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  // SIMULAR LOGIN (QUITAR CUANDO TENGAS EL BACKEND)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: '1',
          email: credentials.email,
          name: 'Usuario Test',
          role: UserRole.EMPRESA, // o UserRole.SUPERADMIN
        },
        token: 'fake-jwt-token-12345',
      });
    }, 1000);
  });
}
```

### 2. Probar Rutas Protegidas

1. Intenta acceder a `/empresa/dashboard` sin estar logueado → debe redirigir a `/login`
2. Haz login como EMPRESA → debe redirigir a `/empresa/dashboard`
3. Intenta acceder a `/superadmin/dashboard` como EMPRESA → debe redirigir a `/empresa/dashboard`

### 3. Probar Persistencia

1. Haz login
2. Recarga la página
3. Deberías seguir logueado (datos en localStorage)

## ✅ Checklist de Integración

- [ ] Actualizar componente Login
- [ ] Actualizar Navigation con Link y useAuth
- [ ] Actualizar Header con logout
- [ ] Actualizar Sidebar con NavLink
- [ ] Remover props onLogin/onLogout de componentes
- [ ] Probar login/logout
- [ ] Probar rutas protegidas
- [ ] Probar persistencia (reload)
- [ ] Conectar con backend real
- [ ] Remover código de simulación

## 🎯 Siguiente Paso: Conectar con Backend Real

Cuando tu backend esté listo:

1. Actualiza `.env` con la URL real:
```env
VITE_API_BASE_URL=https://tu-api.com/api
```

2. Remueve cualquier código de simulación en los servicios

3. Ajusta los tipos en `src/types/index.ts` según la respuesta de tu API

4. Prueba todos los flujos end-to-end

¡Listo! Tu aplicación ahora tiene un sistema de autenticación y consumo de APIs profesional y escalable.
