# 🛍️ EcoShop - Frontend

Una aplicación de ecommerce moderna construida con React, TypeScript y Vite. Interfaz de usuario elegante y responsiva para una experiencia de compra excepcional.

## ✨ Características

- 🔐 **Autenticación completa** - Login, registro y gestión de perfiles
- 🛒 **Carrito de compras** - Agregar, editar y eliminar productos
- 📱 **Diseño responsivo** - Optimizado para móviles y desktop
- 🎨 **UI moderna** - Componentes reutilizables con Tailwind CSS
- 👤 **Gestión de usuarios** - Perfiles y roles de administrador
- 🔍 **Búsqueda y filtros** - Encuentra productos fácilmente
- ⚡ **Rendimiento optimizado** - Carga rápida y navegación fluida

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI con hooks modernos
- **TypeScript** - Tipado estático para mejor desarrollo
- **Vite** - Build tool rápido y moderno
- **React Router** - Navegación del lado del cliente
- **Tailwind CSS** - Framework de CSS utility-first
- **Fetch API** - Cliente HTTP nativo

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Backend API ejecutándose (ver repositorio backend)

### Pasos de instalación

1. **Clona el repositorio**
   \`\`\`bash
   git clone <repository-url>
   cd ecommerce-frontend
   \`\`\`

2. **Instala las dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configura las variables de entorno**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Edita el archivo .env**
   \`\`\`env
   VITE_API_URL=http://localhost:3000
   \`\`\`

5. **Inicia el servidor de desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Abre tu navegador**
   \`\`\`
   http://localhost:5173
   \`\`\`

## 🔧 Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Vista previa de la build de producción
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos de TypeScript
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (Button, Input, etc.)
│   ├── Navbar.tsx      # Barra de navegación
│   ├── ProductCard.tsx # Tarjeta de producto
│   └── UserMenu.tsx    # Menú de usuario
├── contexts/           # Contextos de React
│   └── AuthContext.tsx # Contexto de autenticación
├── hooks/              # Hooks personalizados
│   └── useAuth.ts      # Hook de autenticación
├── pages/              # Páginas de la aplicación
│   ├── Home.tsx        # Página principal
│   ├── Products.tsx    # Lista de productos
│   ├── Cart.tsx        # Carrito de compras
│   ├── Login.tsx       # Inicio de sesión
│   ├── Register.tsx    # Registro
│   ├── Profile.tsx     # Perfil de usuario
│   └── Admin.tsx       # Panel de administración
├── services/           # Servicios de API
│   ├── authService.ts  # Servicio de autenticación
│   └── cartService.ts  # Servicio del carrito
├── types/              # Definiciones de tipos
│   └── index.ts        # Tipos principales
├── utils/              # Utilidades
│   ├── api.ts          # Cliente de API
│   └── auth.ts         # Utilidades de autenticación
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
\`\`\`

## 🔐 Autenticación

La aplicación utiliza un sistema de autenticación basado en tokens JWT:

- **Registro**: Crear nueva cuenta de usuario
- **Login**: Iniciar sesión con credenciales
- **Logout**: Cerrar sesión y limpiar tokens
- **Protección de rutas**: Rutas protegidas para usuarios autenticados
- **Roles**: Soporte para usuarios administradores

## 🛒 Funcionalidades del Carrito

- Agregar productos al carrito
- Actualizar cantidades
- Eliminar productos
- Cálculo automático de totales
- Persistencia durante la sesión

## 🎨 Componentes UI

### Componentes Base
- \`Button\` - Botones con variantes y tamaños
- \`Input\` - Campos de entrada con validación
- \`Alert\` - Mensajes de notificación

### Componentes de Negocio
- \`ProductCard\` - Tarjeta de producto con imagen y acciones
- \`Navbar\` - Navegación principal con autenticación
- \`UserMenu\` - Menú desplegable del usuario

## 🌐 Variables de Entorno

\`\`\`env
# URL del backend API
VITE_API_URL=http://localhost:3000

# Otras configuraciones (opcional)
VITE_APP_NAME=EcoShop
VITE_APP_VERSION=1.0.0
\`\`\`

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conecta tu repositorio a Vercel**
2. **Configura las variables de entorno en Vercel**
3. **Deploy automático en cada push**

### Netlify

1. **Conecta tu repositorio a Netlify**
2. **Configura build command**: \`npm run build\`
3. **Configura publish directory**: \`dist\`

### Build Manual

\`\`\`bash
npm run build
# Los archivos estáticos estarán en /dist
\`\`\`

## 🔗 API Integration

La aplicación se conecta al backend a través de:

- **Base URL**: Configurada en \`VITE_API_URL\`
- **Autenticación**: Headers Bearer token
- **Endpoints principales**:
  - \`/api/auth/*\` - Autenticación
  - \`/api/products\` - Productos
  - \`/api/cart\` - Carrito
  - \`/api/users\` - Usuarios

## 🧪 Testing

\`\`\`bash
# Ejecutar tests (cuando estén configurados)
npm run test

# Coverage
npm run test:coverage
\`\`\`

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Mobile**: 320px - 768px
- 📟 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: 1024px+

## 🔧 Desarrollo

### Agregar nuevas páginas

1. Crear componente en \`src/pages/\`
2. Agregar ruta en \`App.tsx\`
3. Actualizar navegación si es necesario

### Agregar nuevos componentes

1. Crear en \`src/components/\`
2. Exportar desde index si es reutilizable
3. Documentar props con TypeScript

### Gestión de estado

- **Local**: useState, useReducer
- **Global**: Context API (AuthContext)
- **Server**: React Query (futuro)

## 🐛 Troubleshooting

### Problemas comunes

**Error de CORS**
\`\`\`bash
# Verificar que el backend esté ejecutándose
# Verificar VITE_API_URL en .env
\`\`\`

**Error de autenticación**
\`\`\`bash
# Limpiar localStorage
localStorage.clear()
\`\`\`

**Error de build**
\`\`\`bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [TuGitHub](https://github.com/tuusuario)

## 🙏 Agradecimientos

- React team por la increíble biblioteca
- Tailwind CSS por el framework de estilos
- Vite por la herramienta de build rápida
- Comunidad open source por las librerías utilizadas
