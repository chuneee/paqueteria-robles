# 🏗️ Arquitectura Frontend - Paquetería Robles

## 📊 Resumen Ejecutivo

Se ha implementado una **arquitectura profesional y escalable** para el consumo de APIs REST con las siguientes características:

✅ **Sistema HTTP robusto** (Axios + Interceptores)  
✅ **Autenticación JWT** con refresh automático  
✅ **Rutas protegidas** por roles  
✅ **TypeScript** para type-safety  
✅ **Hooks personalizados** reutilizables  
✅ **Gestión de errores** centralizada  
✅ **Variables de entorno** configurables  

---

## 🗂️ Estructura de Archivos Creados

```
frontend/src/
├── config/
│   └── constants.ts              ✅ URLs, rutas, endpoints, mensajes
│
├── contexts/
│   └── AuthContext.tsx           ✅ Contexto de autenticación global
│
├── hooks/
│   ├── useApi.ts                 ✅ Hook para llamadas API
│   ├── useAsync.ts               ✅ Hook para operaciones async
│   ├── usePagination.ts          ✅ Hook para paginación
│   ├── useToast.ts               ✅ Hook para notificaciones
│   └── index.ts
│
├── layouts/
│   ├── PublicLayout.tsx          ✅ Layout para páginas públicas
│   ├── EmpresaLayout.tsx         ✅ Layout para empresas
│   └── SuperAdminLayout.tsx      ✅ Layout para admin
│
├── router/
│   └── index.tsx                 ✅ Configuración de rutas con React Router
│
├── services/
│   ├── http.service.ts           ✅ Servicio HTTP base (Axios)
│   ├── auth.service.ts           ✅ Servicio de autenticación
│   ├── empresa.service.ts        ✅ Servicios de empresa
│   ├── superadmin.service.ts     ✅ Servicios de superadmin
│   └── index.ts
│
├── types/
│   └── index.ts                  ✅ Tipos TypeScript globales
│
├── utils/
│   └── storage.ts                ✅ Utilidades de localStorage
│
├── views/
│   ├── LandingPage.tsx           ✅ Página de inicio
│   └── LoginPage.tsx             ✅ Página de login
│
├── components/shared/
│   └── ProtectedRoute.tsx        ✅ Componente para rutas protegidas
│
├── App.tsx                       ✅ App actualizada con Router
└── main.tsx                      ✅ Punto de entrada actualizado

Archivos de configuración:
├── .env                          ✅ Variables de entorno
├── .env.example                  ✅ Ejemplo de variables
├── .gitignore                    ✅ Git ignore actualizado
├── tsconfig.json                 ✅ Configuración TypeScript
├── tsconfig.node.json            ✅ Config TypeScript para Node
└── vite.config.ts                ✅ Alias @ configurado
```

---

## 🎯 Flujo de Autenticación

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       │ 1. Ingresa credenciales
       ▼
┌─────────────────────┐
│   LoginPage.tsx     │
│  - useAuth hook     │
└──────┬──────────────┘
       │
       │ 2. login({ email, password })
       ▼
┌─────────────────────┐
│  AuthContext.tsx    │
│  - Gestión estado   │
└──────┬──────────────┘
       │
       │ 3. authService.login()
       ▼
┌─────────────────────┐
│  auth.service.ts    │
└──────┬──────────────┘
       │
       │ 4. httpService.post()
       ▼
┌─────────────────────┐
│  http.service.ts    │
│  - Interceptores    │
│  - Axios            │
└──────┬──────────────┘
       │
       │ 5. POST /api/auth/login
       ▼
┌─────────────────────┐
│    BACKEND API      │
└──────┬──────────────┘
       │
       │ 6. { user, token }
       ▼
┌─────────────────────┐
│   localStorage      │
│  - auth_token       │
│  - user_data        │
└──────┬──────────────┘
       │
       │ 7. Redirect según rol
       ▼
┌─────────────────────┐
│  Dashboard (Protegido)│
└─────────────────────┘
```

---

## 🔄 Flujo de Request HTTP

```
Componente
    │
    │ 1. const { data, execute } = useApi(service.method)
    ▼
┌────────────────┐
│   Hook useApi  │
│  - isLoading   │
│  - error       │
└────┬───────────┘
     │
     │ 2. service.method()
     ▼
┌────────────────┐
│   Service      │
│  (empresa/     │
│   superadmin)  │
└────┬───────────┘
     │
     │ 3. httpService.get/post()
     ▼
┌────────────────────────┐
│   HTTP Service         │
│  Request Interceptor:  │
│  - Agregar token       │
│  - Logs desarrollo     │
└────┬───────────────────┘
     │
     │ 4. Axios request
     ▼
┌────────────────┐
│   BACKEND API  │
└────┬───────────┘
     │
     │ 5. Response
     ▼
┌────────────────────────┐
│   HTTP Service         │
│  Response Interceptor: │
│  - Manejar errores     │
│  - Refresh token       │
│  - Logs desarrollo     │
└────┬───────────────────┘
     │
     │ 6. Return data
     ▼
Componente actualiza UI
```

---

## 🛣️ Sistema de Rutas

### Públicas
- `/` → Landing Page
- `/login` → Página de login

### Empresa (Protegidas - Rol: EMPRESA)
- `/empresa/dashboard` → Dashboard
- `/empresa/generar-guia` → Generar guía
- `/empresa/historial-guias` → Historial
- `/empresa/mis-clientes` → Clientes
- `/empresa/solicitar-guias` → Solicitar guías
- `/empresa/perfil` → Perfil

### SuperAdmin (Protegidas - Rol: SUPERADMIN)
- `/superadmin/dashboard` → Dashboard
- `/superadmin/empresas` → Gestión de empresas
- `/superadmin/empresas/:id` → Detalle de empresa
- `/superadmin/guias` → Todas las guías
- `/superadmin/solicitudes` → Solicitudes
- `/superadmin/cobranza` → Cobranza
- `/superadmin/administradores` → Administradores
- `/superadmin/reportes` → Reportes
- `/superadmin/notificaciones` → Notificaciones
- `/superadmin/configuracion` → Configuración

### Admin (Protegidas - Rol: ADMIN)
- `/admin/dashboard` → Dashboard

---

## 🎨 Componentes Clave

### 1. ProtectedRoute
Protege rutas que requieren autenticación y roles específicos.

```typescript
<ProtectedRoute allowedRoles={[UserRole.EMPRESA]}>
  <EmpresaDashboard />
</ProtectedRoute>
```

### 2. AuthContext
Proporciona estado de autenticación global.

```typescript
const { user, isAuthenticated, login, logout, hasRole } = useAuth();
```

### 3. Layouts
Envuelven las páginas con estructura común (Header, Sidebar).

```
PublicLayout → Sin sidebar
EmpresaLayout → Con sidebar de empresa
SuperAdminLayout → Con sidebar de admin
```

---

## 🪝 Hooks Disponibles

| Hook | Uso | Ejemplo |
|------|-----|---------|
| `useAuth` | Autenticación | `const { user, login, logout } = useAuth()` |
| `useApi` | Llamadas API | `const { data, execute } = useApi(service.method)` |
| `useAsync` | Async con auto-exec | `const { data } = useAsync(fn, { immediate: true })` |
| `usePagination` | Paginación | `const { page, setPage } = usePagination()` |
| `useToast` | Notificaciones | `const { showSuccess } = useToast()` |

---

## 📦 Servicios Disponibles

### authService
- `login(credentials)` - Iniciar sesión
- `logout()` - Cerrar sesión
- `getCurrentUser()` - Obtener usuario actual
- `changePassword(data)` - Cambiar contraseña

### empresaService
**Clientes:**
- `getClientes(params)` - Obtener lista
- `getCliente(id)` - Obtener por ID
- `createCliente(data)` - Crear
- `updateCliente(id, data)` - Actualizar
- `deleteCliente(id)` - Eliminar

**Guías:**
- `getGuias(params)` - Obtener lista
- `getGuia(id)` - Obtener por ID
- `createGuia(data)` - Crear
- `updateGuia(id, data)` - Actualizar

**Solicitudes:**
- `getSolicitudes(params)` - Obtener lista
- `createSolicitud(data)` - Crear

### superAdminService
**Dashboard:**
- `getDashboardStats()` - Estadísticas

**Empresas:**
- `getEmpresas(params)` - Obtener lista
- `getEmpresa(id)` - Obtener por ID
- `createEmpresa(data)` - Crear
- `updateEmpresa(id, data)` - Actualizar
- `deleteEmpresa(id)` - Eliminar
- `addGuiasToEmpresa(id, cantidad)` - Agregar guías

**Administradores:**
- `getAdministradores(params)` - Obtener lista
- `createAdministrador(data)` - Crear
- `updateAdministrador(id, data)` - Actualizar
- `deleteAdministrador(id)` - Eliminar

**Guías:**
- `getGuias(params)` - Obtener todas
- `updateGuiaEstado(id, estado)` - Actualizar estado

**Solicitudes:**
- `getSolicitudes(params)` - Obtener todas
- `aprobarSolicitud(id)` - Aprobar
- `rechazarSolicitud(id, motivo)` - Rechazar

**Cobranza:**
- `getCobranza(params)` - Obtener registros
- `registrarPago(data)` - Registrar pago

**Reportes:**
- `generarReporte(tipo, params)` - Generar
- `descargarReporte(id)` - Descargar

---

## 🔒 Seguridad Implementada

✅ **Tokens JWT** almacenados en localStorage  
✅ **Refresh automático** antes de expiración  
✅ **Interceptores** para agregar token a requests  
✅ **Redirección automática** al login en 401  
✅ **Rutas protegidas** por autenticación y rol  
✅ **Limpieza de datos** en logout  

---

## 🚀 Cómo Usar

### 1. Configurar Backend
```bash
# Editar .env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Crear un Componente que Consume API

```typescript
import { useEffect } from 'react';
import { useApi, useToast } from '@/hooks';
import { empresaService } from '@/services';

function MisClientes() {
  const { data, isLoading, error, execute } = useApi(
    empresaService.getClientes
  );
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    execute({ page: 1, pageSize: 10 });
  }, []);

  const handleCreate = async (clienteData) => {
    try {
      await empresaService.createCliente(clienteData);
      showSuccess('Cliente creado');
      execute(); // Recargar lista
    } catch (error) {
      showError(error.message);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map(cliente => (
        <div key={cliente.id}>{cliente.nombre}</div>
      ))}
    </div>
  );
}
```

### 3. Añadir Nuevo Endpoint

```typescript
// 1. En constants.ts
export const API_ENDPOINTS = {
  EMPRESA: {
    PRODUCTOS: '/empresa/productos',
  }
}

// 2. En empresa.service.ts
async getProductos(): Promise<Producto[]> {
  const response = await httpService.get(
    API_ENDPOINTS.EMPRESA.PRODUCTOS
  );
  return response.data!;
}

// 3. En tu componente
const { data, execute } = useApi(empresaService.getProductos);
```

---

## 📚 Documentación Completa

Lee la documentación completa en:
- **`ARQUITECTURA_API.md`** - Guía técnica detallada
- **`EJEMPLO_INTEGRACION_LOGIN.md`** - Migración del Login actual

---

## ✅ Testing Checklist

- [ ] Login con credenciales correctas
- [ ] Login con credenciales incorrectas
- [ ] Redirección según rol después de login
- [ ] Logout y limpieza de datos
- [ ] Acceso a ruta protegida sin autenticación → redirect a login
- [ ] Acceso a ruta de otro rol → redirect a su dashboard
- [ ] Persistencia después de reload
- [ ] Refresh automático de token
- [ ] Manejo de errores de red
- [ ] Notificaciones toast

---

## 🎯 Próximos Pasos

1. **Actualizar componente Login** siguiendo `EJEMPLO_INTEGRACION_LOGIN.md`
2. **Conectar con backend real** actualizando `.env`
3. **Ajustar tipos** en `types/index.ts` según tu API
4. **Implementar vistas** usando los servicios
5. **Testing end-to-end** con backend real

---

## 🆘 Soporte

Si encuentras algún problema:

1. Revisa la consola del navegador para errores
2. Verifica que `.env` tenga la URL correcta
3. Confirma que el backend esté corriendo
4. Revisa la documentación en `ARQUITECTURA_API.md`

---

**¡La arquitectura está lista para escalar! 🚀**
