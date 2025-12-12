# Arquitectura de Componentes - Paquetería Robles

Este documento describe la nueva arquitectura organizada del proyecto frontend.

## 📁 Estructura de Componentes

### Landing Page

Los componentes de la landing page permanecen en:

```
src/components/
  ├── BusinessSection.tsx
  ├── ContactSection.tsx
  ├── CoverageSection.tsx
  ├── Footer.tsx
  ├── HeroSection.tsx
  ├── Navigation.tsx
  ├── ServicesSection.tsx
  └── WhyChooseUsSection.tsx
```

### SuperAdmin - Por Vista

Los componentes de SuperAdmin ahora están organizados por vista del sidebar:

```
src/components/superadmin/
  ├── dashboard/              # Vista principal Dashboard
  │   ├── ActividadReciente.tsx
  │   ├── EstadoGuiasChart.tsx
  │   ├── GuiasChart.tsx
  │   ├── MetricCard.tsx
  │   ├── SolicitudesRecientes.tsx
  │   ├── TopEmpresas.tsx
  │   └── index.ts
  │
  ├── administradores/        # Vista de Administradores
  │   ├── AdminModal.tsx
  │   ├── AdminTable.tsx
  │   └── index.ts
  │
  ├── empresas/               # Vista de Empresas
  │   ├── AgregarGuiasModal.tsx
  │   ├── EmpresaModal.tsx
  │   ├── EmpresaTable.tsx
  │   ├── RegistrarPagoModal.tsx
  │   └── index.ts
  │
  ├── solicitudes/            # Vista de Solicitudes de Guías
  │   ├── ConfirmarAprobacionModal.tsx
  │   ├── DetalleSolicitudModal.tsx
  │   ├── RechazarSolicitudModal.tsx
  │   └── index.ts
  │
  ├── cobranza/               # Vista de Cobranza
  │   ├── ConfirmarEliminarPagoModal.tsx
  │   ├── DetallePagoModal.tsx
  │   ├── RegistrarPagoCobranzaModal.tsx
  │   └── index.ts
  │
  ├── guias/                  # Vista de Guías
  │   ├── ActualizarEstadoGuiaModal.tsx
  │   ├── DetalleGuiaModal.tsx
  │   └── index.ts
  │
  ├── reportes/               # Vista de Reportes
  │   └── (componentes futuros)
  │
  ├── notificaciones/         # Vista de Notificaciones
  │   └── (componentes futuros)
  │
  ├── configuracion/          # Vista de Configuración
  │   └── (componentes futuros)
  │
  └── shared/                 # Componentes compartidos
      ├── ConfirmModal.tsx
      ├── Header.tsx
      ├── Sidebar.tsx
      └── index.ts
```

### Empresa - Por Vista

Los componentes de Empresa están organizados por vista del sidebar:

```
src/components/empresa/
  ├── generar-guia/           # Vista Generar Guía
  │   ├── GuiaGeneradaModal.tsx
  │   ├── SeleccionarClienteDropdown.tsx
  │   └── index.ts
  │
  ├── historial-guias/        # Vista Historial de Guías
  │   ├── DetalleGuiaModal.tsx
  │   └── index.ts
  │
  ├── mis-clientes/           # Vista Mis Clientes
  │   ├── ConfirmarEliminarClienteModal.tsx
  │   ├── NuevoClienteModal.tsx
  │   └── index.ts
  │
  ├── solicitar-guias/        # Vista Solicitar Guías
  │   ├── DetalleSolicitudModal.tsx
  │   └── index.ts
  │
  ├── perfil-configuracion/   # Vista Perfil y Configuración
  │   ├── CambiarPasswordModal.tsx
  │   └── index.ts
  │
  └── shared/                 # Componentes compartidos
      ├── Header.tsx
      ├── Sidebar.tsx
      └── index.ts
```

### Componentes Compartidos Globales

```
src/components/shared/
  ├── EmptyState.tsx
  ├── Toast.tsx
  └── index.ts
```

## 🔄 Cómo Importar Componentes

### Antes (Antiguo)

```typescript
import { MetricCard } from "../components/superadmin/MetricCard";
import { GuiasChart } from "../components/superadmin/GuiasChart";
import { AdminTable } from "../components/superadmin/AdminTable";
```

### Ahora (Nuevo)

```typescript
// Importación por vista (más organizado)
import { MetricCard, GuiasChart } from "../components/superadmin/dashboard";
import {
  AdminTable,
  AdminModal,
} from "../components/superadmin/administradores";
import { Sidebar, Header } from "../components/superadmin/shared";
```

## ✅ Beneficios de esta Arquitectura

1. **Organización por Funcionalidad**: Cada carpeta representa una vista específica del sidebar
2. **Fácil Localización**: Sabes exactamente dónde buscar un componente según la vista
3. **Escalabilidad**: Fácil agregar nuevos componentes a cada vista
4. **Mantenimiento**: Cambios en una vista no afectan otras vistas
5. **Imports Limpios**: Uso de index.ts para importaciones más limpias
6. **Reutilización**: Componentes compartidos claramente separados en /shared

## 🎯 Convenciones

- Cada carpeta de vista tiene su propio `index.ts` para exports
- Los componentes compartidos (Header, Sidebar) están en `/shared`
- Los nombres de carpetas coinciden con las vistas del sidebar
- Los componentes específicos de una vista se mantienen dentro de su carpeta

## 📝 Agregar Nuevos Componentes

Para agregar un nuevo componente:

1. Identifica a qué vista pertenece
2. Créalo en la carpeta correspondiente
3. Agrégalo al `index.ts` de esa carpeta
4. Importa desde la carpeta, no del archivo directo

Ejemplo:

```typescript
// ✅ Correcto
import { NuevoComponente } from "../components/superadmin/dashboard";

// ❌ Evitar
import { NuevoComponente } from "../components/superadmin/dashboard/NuevoComponente";
```

## 🚀 Migración Completada

✅ Todos los componentes de SuperAdmin reorganizados
✅ Todos los componentes de Empresa reorganizados
✅ Todas las importaciones actualizadas
✅ Proyecto compila sin errores
✅ Archivos index.ts creados para todas las vistas
