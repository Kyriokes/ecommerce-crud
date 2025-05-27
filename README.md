# 🛍️ EcoShop - Fullstack Ecommerce Platform

Una plataforma de ecommerce completa construida con React + TypeScript (frontend) y Node.js + Express + Prisma (backend).

## 📋 Descripción del Proyecto

EcoShop es una aplicación de comercio electrónico moderna que incluye:

- **Frontend**: Interfaz de usuario responsiva con React, TypeScript y Tailwind CSS
- **Backend**: API REST con Node.js, Express, Prisma y PostgreSQL
- **Autenticación**: Sistema completo de login/registro con JWT
- **Carrito de compras**: Gestión completa de productos y pedidos
- **Panel de administración**: Gestión de productos y usuarios

## 🏗️ Arquitectura del Proyecto

\`\`\`
ecommerce-fullstack/
├── 📁 Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── contexts/       # Contextos de React
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── services/       # Servicios de API
│   │   ├── types/          # Tipos de TypeScript
│   │   └── utils/          # Utilidades
│   ├── package.json
│   └── vite.config.ts
│
├── 📁 Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/    # Controladores de rutas
│   │   ├── routes/         # Definición de rutas
│   │   ├── middlewares/    # Middlewares personalizados
│   │   ├── services/       # Lógica de negocio
│   │   ├── types/          # Tipos de TypeScript
│   │   └── utils/          # Utilidades
│   ├── prisma/
│   │   ├── schema.prisma   # Esquema de base de datos
│   │   └── migrations/     # Migraciones
│   ├── package.json
│   └── tsconfig.json
│
├── package.json            # Scripts del monorepo
├── vercel.json            # Configuración de Vercel
└── README.md              # Este archivo
\`\`\`

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool moderno
- **Tailwind CSS** - Framework de CSS
- **React Router** - Navegación

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación

## 🛠️ Instalación y Desarrollo Local

### Prerrequisitos
- Node.js 18+
- PostgreSQL (local o en la nube)
- npm o yarn

### 1. Clonar el repositorio
\`\`\`bash
git clone <repository-url>
cd ecommerce-fullstack
\`\`\`

### 2. Instalar dependencias del monorepo
\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno

**Frontend (.env en la raíz):**
\`\`\`env
VITE_API_URL=http://localhost:3000
\`\`\`

**Backend (.env en la raíz):**
\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
SUPABASE_URL="https://your-project.supabase.co"
FRONTEND_URL="http://localhost:5173"
PORT=3000
\`\`\`

### 4. Configurar la base de datos
\`\`\`bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma db push

# (Opcional) Seed de datos
npm run seed
\`\`\`

### 5. Iniciar el desarrollo
\`\`\`bash
# Inicia frontend y backend simultáneamente
npm run dev
\`\`\`

Esto iniciará:
- Frontend en: http://localhost:5173
- Backend en: http://localhost:3000

## 📦 Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev              # Inicia frontend y backend
npm run dev:frontend     # Solo frontend
npm run dev:backend      # Solo backend

# Build
npm run build           # Build completo
npm run build:frontend  # Solo frontend
npm run build:backend   # Solo backend

# Base de datos
npm run db:migrate      # Ejecutar migraciones
npm run db:studio       # Abrir Prisma Studio
npm run db:seed         # Seed de datos

# Utilidades
npm run lint           # Linting
npm run type-check     # Verificar tipos
\`\`\`

## 🌐 Deployment en Vercel

### Variables de Entorno Requeridas

**En Vercel Dashboard:**
\`\`\`
DATABASE_URL=postgresql://user:pass@host:port/database
SUPABASE_URL=https://your-project.supabase.co
FRONTEND_URL=https://your-app.vercel.app
PORT=3000
VITE_API_URL=https://your-app.vercel.app
\`\`\`

### Pasos para Deploy

1. **Conectar repositorio a Vercel**
2. **Configurar variables de entorno**
3. **Deploy automático**

Ver sección detallada de deployment más abajo.

## 🔐 Autenticación

El sistema incluye:
- Registro de usuarios
- Login/Logout
- Protección de rutas
- Roles de usuario (admin/user)
- Gestión de perfiles

## 🛒 Funcionalidades

### Para Usuarios
- ✅ Navegación de productos
- ✅ Búsqueda y filtros
- ✅ Carrito de compras
- ✅ Gestión de perfil
- 🔄 Checkout (en desarrollo)
- 🔄 Historial de pedidos (en desarrollo)

### Para Administradores
- ✅ Panel de administración
- 🔄 Gestión de productos (en desarrollo)
- 🔄 Gestión de usuarios (en desarrollo)
- 🔄 Reportes y analytics (en desarrollo)

## 🗄️ Base de Datos

### Modelos Principales
- **User** - Usuarios del sistema
- **Product** - Productos del catálogo
- **Cart** - Items del carrito
- **Order** - Pedidos realizados
- **OrderItem** - Items de cada pedido

### Esquema
Ver \`prisma/schema.prisma\` para el esquema completo.

## 🔧 Configuración de Desarrollo

### Estructura de Carpetas
- \`src/\` - Código fuente (frontend y backend)
- \`prisma/\` - Configuración de base de datos
- \`public/\` - Archivos estáticos del frontend

### Convenciones de Código
- TypeScript estricto
- ESLint + Prettier
- Conventional Commits
- Componentes funcionales con hooks

## 🚀 Deployment Detallado

### Preparación
1. Base de datos en la nube (Neon, Supabase, etc.)
2. Variables de entorno configuradas
3. Código en repositorio Git

### Vercel Configuration
El proyecto usa \`vercel.json\` para configurar el deployment como fullstack.

## 🐛 Troubleshooting

### Problemas Comunes

**Error de conexión a la base de datos:**
\`\`\`bash
# Verificar DATABASE_URL
# Verificar que la base de datos esté accesible
\`\`\`

**Error de CORS:**
\`\`\`bash
# Verificar FRONTEND_URL en el backend
# Verificar VITE_API_URL en el frontend
\`\`\`

**Error de build:**
\`\`\`bash
# Limpiar node_modules
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama (\`git checkout -b feature/nueva-funcionalidad\`)
3. Commit tus cambios (\`git commit -m 'Agregar nueva funcionalidad'\`)
4. Push a la rama (\`git push origin feature/nueva-funcionalidad\`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Equipo

- **Desarrollador Principal** - [Tu nombre](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- React y Node.js communities
- Vercel por el hosting
- Prisma por el excelente ORM
- Tailwind CSS por el framework de estilos
