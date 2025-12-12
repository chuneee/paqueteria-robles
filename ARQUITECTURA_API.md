# Arquitectura de Consumo de APIs - Paquetería Robles

## 📋 Tabla de Contenidos
- [Visión General](#visión-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Capa de Servicios](#capa-de-servicios)
- [Sistema de Autenticación](#sistema-de-autenticación)
- [Sistema de Rutas](#sistema-de-rutas)
- [Hooks Personalizados](#hooks-personalizados)
- [Guía de Uso](#guía-de-uso)
- [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🎯 Visión General

Esta arquitectura proporciona un sistema completo y escalable para consumir APIs en React, con las siguientes características:

- ✅ **HTTP Service** con Axios e interceptores
- ✅ **Autenticación JWT** con refresh token automático
- ✅ **Rutas protegidas** por rol (SUPERADMIN, EMPRESA, ADMIN)
- ✅ **Gestión de estado** con React Context
- ✅ **Hooks personalizados** para operaciones comunes
- ✅ **Manejo de errores** centralizado
- ✅ **TypeScript** para type-safety
- ✅ **Variables de entorno** configurables

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/                    # Componentes de autenticación
│   ├── empresa/                 # Componentes de empresa
│   ├── superadmin/              # Componentes de superadmin
│   └── shared/                  # Componentes compartidos
│       └── ProtectedRoute.tsx   # Rutas protegidas
│
├── config/
│   └── constants.ts             # Constantes y configuración
│
├── contexts/
│   └── AuthContext.tsx          # Contexto de autenticación
│
├── hooks/
│   ├── useApi.ts                # Hook para llamadas API
│   ├── useAsync.ts              # Hook para operaciones async
│   ├── usePagination.ts         # Hook para paginación
│   ├── useToast.ts              # Hook para notificaciones
│   └── index.ts
│
├── layouts/
│   ├── PublicLayout.tsx         # Layout público
│   ├── EmpresaLayout.tsx        # Layout de empresa
│   └── SuperAdminLayout.tsx     # Layout de superadmin
│
├── router/
│   └── index.tsx                # Configuración de rutas
│
├── services/
│   ├── http.service.ts          # Servicio HTTP base (Axios)
│   ├── auth.service.ts          # Servicio de autenticación
│   ├── empresa.service.ts       # Servicio de empresa
│   ├── superadmin.service.ts    # Servicio de superadmin
│   └── index.ts
│
├── types/
│   └── index.ts                 # Tipos TypeScript globales
│
├── utils/
│   └── storage.ts               # Utilidades de localStorage
│
├── views/                       # Vistas/Páginas
│   ├── empresa/
│   ├── superadmin/
│   ├── LandingPage.tsx
│   └── LoginPage.tsx
│
├── App.tsx                      # Componente principal
└── main.tsx                     # Punto de entrada
```

---

## 🔧 Capa de Servicios

### HTTP Service (`src/services/http.service.ts`)

Servicio base que maneja todas las peticiones HTTP con Axios.

**Características:**
- Interceptores de request/response
- Manejo automático de tokens JWT
- Refresh token automático
- Manejo centralizado de errores
- Timeout configurable
- Logs en desarrollo

**Uso:**
```typescript
import { httpService } from '@/services';

// GET request
const data = await httpService.get('/endpoint');

// POST request
const result = await httpService.post('/endpoint', { data });

// Upload file
const uploaded = await httpService.uploadFile('/upload', file, (progress) => {
  console.log(`Upload: ${progress}%`);
});
```

### Auth Service (`src/services/auth.service.ts`)

Maneja la autenticación de usuarios.

```typescript
import { authService } from '@/services';

// Login
const { user, token } = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get current user
const user = await authService.getCurrentUser();

// Change password
await authService.changePassword({
  currentPassword: 'old',
  newPassword: 'new'
});

// Logout
await authService.logout();
```

### Empresa Service (`src/services/empresa.service.ts`)

Servicios específicos para empresas.

```typescript
import { empresaService } from '@/services';

// Obtener clientes paginados
const clientes = await empresaService.getClientes({
  page: 1,
  pageSize: 10,
  search: 'Juan'
});

// Crear cliente
const newCliente = await empresaService.createCliente({
  nombre: 'Juan Pérez',
  email: 'juan@example.com'
});

// Crear guía
const guia = await empresaService.createGuia({
  clienteId: '123',
  origen: 'CDMX',
  destino: 'Guadalajara'
});
```

### SuperAdmin Service (`src/services/superadmin.service.ts`)

Servicios para administradores.

```typescript
import { superAdminService } from '@/services';

// Dashboard stats
const stats = await superAdminService.getDashboardStats();

// Gestionar empresas
const empresas = await superAdminService.getEmpresas({ page: 1 });
await superAdminService.addGuiasToEmpresa('empresa-id', 100);

// Aprobar/rechazar solicitudes
await superAdminService.aprobarSolicitud('solicitud-id');
await superAdminService.rechazarSolicitud('solicitud-id', 'Motivo del rechazo');
```

---

## 🔐 Sistema de Autenticación

### AuthContext (`src/contexts/AuthContext.tsx`)

Contexto global que maneja el estado de autenticación.

**Características:**
- Persistencia en localStorage
- Validación automática de token al cargar
- Métodos para login/logout
- Verificación de roles

**Uso en componentes:**
```typescript
import { useAuth } from '@/hooks';

function MyComponent() {
  const { user, isAuthenticated, login, logout, hasRole } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email, password });
      // Usuario autenticado
    } catch (error) {
      // Manejar error
    }
  };

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <h1>Bienvenido {user?.name}</h1>
      {hasRole('SUPERADMIN') && <AdminPanel />}
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
```

### Protected Route (`src/components/shared/ProtectedRoute.tsx`)

Componente para proteger rutas que requieren autenticación.

```typescript
<ProtectedRoute allowedRoles={[UserRole.EMPRESA]}>
  <EmpresaDashboard />
</ProtectedRoute>
```

---

## 🛣️ Sistema de Rutas

### Router (`src/router/index.tsx`)

Configuración centralizada de todas las rutas con React Router.

**Estructura:**
```typescript
// Rutas públicas
/ → Landing Page
/login → Login Page

// Rutas de Empresa (protegidas)
/empresa/dashboard → Dashboard de empresa
/empresa/generar-guia → Generar guía
/empresa/historial-guias → Historial
/empresa/mis-clientes → Clientes
/empresa/perfil → Perfil

// Rutas de SuperAdmin (protegidas)
/superadmin/dashboard → Dashboard
/superadmin/empresas → Gestión de empresas
/superadmin/guias → Todas las guías
/superadmin/solicitudes → Solicitudes
/superadmin/cobranza → Cobranza
```

**Navegación:**
```typescript
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/constants';

function MyComponent() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate(ROUTES.EMPRESA_DASHBOARD);
  };
}
```

---

## 🪝 Hooks Personalizados

### useApi

Hook para llamadas API con estado de loading y error.

```typescript
import { useApi } from '@/hooks';
import { empresaService } from '@/services';

function ClientesView() {
  const { data, isLoading, error, execute } = useApi(
    empresaService.getClientes
  );

  useEffect(() => {
    execute({ page: 1, pageSize: 10 });
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return <ClientesList clientes={data?.data} />;
}
```

### useAsync

Hook para operaciones async con ejecución automática.

```typescript
import { useAsync } from '@/hooks';

function Dashboard() {
  const { data, isLoading } = useAsync(
    () => superAdminService.getDashboardStats(),
    { immediate: true }
  );

  return <Stats data={data} />;
}
```

### usePagination

Hook para manejar paginación.

```typescript
import { usePagination } from '@/hooks';

function ClientesTable() {
  const { page, pageSize, setPage, getPaginationParams } = usePagination();

  useEffect(() => {
    loadClientes(getPaginationParams());
  }, [page, pageSize]);

  return (
    <Pagination
      currentPage={page}
      onPageChange={setPage}
    />
  );
}
```

### useToast

Hook para mostrar notificaciones.

```typescript
import { useToast } from '@/hooks';

function CreateClienteForm() {
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (data) => {
    try {
      await empresaService.createCliente(data);
      showSuccess('Cliente creado exitosamente');
    } catch (error) {
      showError('Error al crear cliente');
    }
  };
}
```

---

## 📚 Guía de Uso

### 1. Configurar Variables de Entorno

Edita el archivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
```

### 2. Crear un Nuevo Endpoint

**Paso 1:** Agregar endpoint en `src/config/constants.ts`:
```typescript
export const API_ENDPOINTS = {
  EMPRESA: {
    PRODUCTOS: '/empresa/productos',
  },
};
```

**Paso 2:** Agregar método en el servicio:
```typescript
// src/services/empresa.service.ts
async getProductos(params?: FilterParams): Promise<PaginatedResponse<Producto>> {
  const response = await httpService.get(
    API_ENDPOINTS.EMPRESA.PRODUCTOS,
    { params }
  );
  return response.data!;
}
```

**Paso 3:** Usar en componente:
```typescript
import { useApi } from '@/hooks';
import { empresaService } from '@/services';

function ProductosView() {
  const { data, isLoading, execute } = useApi(empresaService.getProductos);

  useEffect(() => {
    execute();
  }, []);
}
```

### 3. Crear una Nueva Ruta

**Paso 1:** Definir ruta en `src/config/constants.ts`:
```typescript
export const ROUTES = {
  PRODUCTOS: '/empresa/productos',
};
```

**Paso 2:** Agregar en `src/router/index.tsx`:
```typescript
{
  path: '/empresa',
  element: <ProtectedRoute allowedRoles={[UserRole.EMPRESA]}>
    <EmpresaLayout />
  </ProtectedRoute>,
  children: [
    {
      path: 'productos',
      element: <ProductosView />
    }
  ]
}
```

### 4. Proteger por Roles

```typescript
<ProtectedRoute allowedRoles={[UserRole.SUPERADMIN, UserRole.ADMIN]}>
  <AdminOnlyComponent />
</ProtectedRoute>
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: CRUD Completo de Clientes

```typescript
import { useState, useEffect } from 'react';
import { useApi, useToast, usePagination } from '@/hooks';
import { empresaService } from '@/services';

function ClientesView() {
  const { showSuccess, showError } = useToast();
  const { page, pageSize, getPaginationParams } = usePagination();
  const { data, isLoading, execute } = useApi(empresaService.getClientes);

  // Cargar clientes
  useEffect(() => {
    execute(getPaginationParams());
  }, [page, pageSize]);

  // Crear cliente
  const handleCreate = async (clienteData) => {
    try {
      await empresaService.createCliente(clienteData);
      showSuccess('Cliente creado exitosamente');
      execute(getPaginationParams()); // Recargar
    } catch (error) {
      showError(error.message);
    }
  };

  // Actualizar cliente
  const handleUpdate = async (id, clienteData) => {
    try {
      await empresaService.updateCliente(id, clienteData);
      showSuccess('Cliente actualizado');
      execute(getPaginationParams());
    } catch (error) {
      showError(error.message);
    }
  };

  // Eliminar cliente
  const handleDelete = async (id) => {
    try {
      await empresaService.deleteCliente(id);
      showSuccess('Cliente eliminado');
      execute(getPaginationParams());
    } catch (error) {
      showError(error.message);
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <ClientesList
        clientes={data?.data}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <CreateClienteForm onSubmit={handleCreate} />
    </div>
  );
}
```

### Ejemplo 2: Login con Redirección

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useToast } from '@/hooks';
import { ROUTES } from '@/config/constants';
import { UserRole } from '@/types';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login({ email, password });
      
      // Redirigir según el rol
      const user = storage.getUserData();
      if (user.role === UserRole.SUPERADMIN) {
        navigate(ROUTES.SUPERADMIN_DASHBOARD);
      } else if (user.role === UserRole.EMPRESA) {
        navigate(ROUTES.EMPRESA_DASHBOARD);
      }
    } catch (error) {
      showError('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
```

### Ejemplo 3: Dashboard con Métricas

```typescript
import { useAsync } from '@/hooks';
import { superAdminService } from '@/services';

function Dashboard() {
  const { data: stats, isLoading } = useAsync(
    () => superAdminService.getDashboardStats(),
    { immediate: true }
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard
        title="Total Empresas"
        value={stats.totalEmpresas}
        icon={<BuildingIcon />}
      />
      <MetricCard
        title="Total Guías"
        value={stats.totalGuias}
        icon={<PackageIcon />}
      />
      <MetricCard
        title="Solicitudes Pendientes"
        value={stats.solicitudesPendientes}
        icon={<ClockIcon />}
      />
      <MetricCard
        title="Ingresos Mensuales"
        value={`$${stats.ingresosMensuales}`}
        icon={<DollarIcon />}
      />
    </div>
  );
}
```

---

## 🚀 Iniciar el Proyecto

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu API

# Iniciar en desarrollo
npm run dev

# Build para producción
npm run build
```

---

## 📝 Notas Importantes

1. **Tipos TypeScript**: Ajusta los tipos en `src/types/index.ts` según tu API
2. **Endpoints**: Actualiza `src/config/constants.ts` con tus endpoints reales
3. **Refresh Token**: El sistema maneja automáticamente el refresh de tokens
4. **Error Handling**: Los errores se manejan centralizadamente en el HTTP service
5. **localStorage**: Los tokens y datos de usuario se guardan de forma segura

---

## 🔒 Seguridad

- Los tokens se almacenan en localStorage (considera httpOnly cookies para producción)
- Todas las rutas protegidas verifican autenticación y roles
- Los errores 401 redirigen automáticamente al login
- El refresh token se ejecuta automáticamente antes de expirar

---

¡Esta arquitectura está lista para escalar y consumir cualquier API REST! 🎉
