# Ecommerce Backend API

Backend API para aplicación de ecommerce construida con Node.js, Express, Prisma y PostgreSQL, con autenticación via Supabase.

## 🚀 Características

- **Autenticación**: Integración con Supabase Auth (JWT)
- **Base de datos**: PostgreSQL con Prisma ORM
- **Seguridad**: Hash de contraseñas con bcrypt
- **Validaciones**: Validación completa de datos de entrada
- **CORS**: Configurado para desarrollo y producción
- **TypeScript**: Tipado estático completo

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL
- Cuenta de Supabase

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd ecommerce-crud/backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` con tus valores:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"
SUPABASE_URL="https://your-project.supabase.co"
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

4. **Configurar base de datos**
```bash
# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# (Opcional) Poblar con datos de prueba
npm run seed
```

## 📁 Estructura del Proyecto

```
backend/
├── prisma/                    # Configuración y migraciones de la base de datos
│   ├── migrations/            # Historial de migraciones Prisma
│   └── schema.prisma          # Definición del modelo de datos
├── src/                       # Código fuente principal
│   ├── controllers/           # Lógica de control para cada entidad
│   │   ├── authController.ts      # Controlador de autenticación
│   │   ├── cartController.ts      # Controlador de carrito
│   │   ├── productController.ts   # Controlador de productos
│   │   └── userController.ts      # Controlador de usuarios
│   ├── middlewares/          # Middlewares personalizados de Express
│   │   ├── adminAuth.ts           # Verificación de rol admin
│   │   ├── authenticateSupabase.ts# Autenticación con Supabase JWT
│   │   ├── rateLimiter.ts         # Límite de peticiones
│   │   ├── validateInput.ts       # Validación de datos de entrada
│   │   └── validateOwnership.ts   # Verifica que un recurso pertenece al usuario
│   ├── prisma/               # Script de seed para la base de datos
│   │   └── seed.ts
│   ├── routes/               # Rutas de la API
│   │   ├── authRoutes.ts         # Rutas de autenticación
│   │   ├── cartRoutes.ts         # Rutas del carrito
│   │   ├── productRoutes.ts      # Rutas de productos
│   │   └── userRoutes.ts         # Rutas de usuarios
│   ├── types/                # Tipos personalizados (TypeScript)
│   │   └── express.d.ts          # Extiende el objeto Request
│   ├── utils/                # Utilidades generales
│   │   └── prisma.ts             # Cliente de Prisma centralizado
│   └── index.ts              # Punto de entrada del servidor
├── package-lock.json         # Archivo de lock de dependencias
├── package.json              # Configuración del proyecto y dependencias
├── readme.md                 # Documentación del backend
├── tsconfig.json             # Configuración de TypeScript
└── vercel.json               # Configuración para deploy en Vercel

```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Autenticación
Todas las rutas protegidas requieren header:
```
Authorization: Bearer <supabase-jwt-token>
```

### Productos
- `GET /api/products` - Listar productos (público)
- `GET /api/products/:id` - Obtener producto (público)
- `POST /api/products` - Crear producto (protegido)
- `PUT /api/products/:id` - Actualizar producto (protegido)
- `DELETE /api/products/:id` - Eliminar producto (protegido)

### Usuarios
- `POST /api/users` - Registrar usuario (público)
- `GET /api/users` - Listar usuarios (protegido)
- `GET /api/users/:id` - Obtener usuario (protegido)
- `PUT /api/users/:id` - Actualizar usuario (protegido)
- `DELETE /api/users/:id` - Eliminar usuario (protegido)

### Carrito
- `GET /api/cart` - Obtener carrito del usuario (protegido)
- `POST /api/cart` - Agregar al carrito (protegido)
- `PUT /api/cart/:id` - Actualizar cantidad (protegido)
- `DELETE /api/cart/:id` - Eliminar del carrito (protegido)

## 🗄️ Esquema de Base de Datos

### Modelos principales:
- **User**: Usuarios del sistema
- **Product**: Productos del catálogo
- **Cart**: Items en el carrito de compras
- **Order**: Órdenes de compra
- **OrderItem**: Items de las órdenes

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar en producción
- `npm run db:migrate` - Ejecutar migraciones
- `npm run db:generate` - Generar cliente Prisma
- `npm run db:studio` - Abrir Prisma Studio
- `npm run seed` - Poblar base de datos

## 🛡️ Seguridad

- Contraseñas hasheadas con bcrypt (salt rounds: 12)
- Validación JWT con Supabase
- Validación de entrada en todos los endpoints
- CORS configurado
- Variables de entorno para datos sensibles

## 📝 Ejemplos de Uso

### Crear un producto
```bash
curl -X POST http://localhost:3000/api/products \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <token>" \\
  -d '{
    "name": "Laptop Gaming",
    "description": "Laptop para gaming de alta gama",
    "price": 1299.99,
    "stock": 10,
    "category": "Electronics"
  }'
```

### Agregar al carrito
```bash
curl -X POST http://localhost:3000/api/cart \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <token>" \\
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

## 🐛 Troubleshooting

### Error de conexión a base de datos
- Verificar que PostgreSQL esté ejecutándose
- Comprobar `DATABASE_URL` en `.env`
- Ejecutar `npm run db:migrate`

### Error de autenticación
- Verificar `SUPABASE_URL` en `.env`
- Comprobar que el token JWT sea válido
- Verificar configuración de Supabase

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
```

## 📋 Resumen de Mejoras Implementadas

### ✅ **Seguridad**
- Hash de contraseñas con bcrypt
- Protección de rutas sensibles
- No exposición de contraseñas en respuestas
- Validación de tokens JWT mejorada

### ✅ **Validaciones**
- Validación de tipos de datos
- Verificación de stock disponible
- Validación de emails y contraseñas
- Verificación de existencia de recursos

### ✅ **Manejo de Errores**
- Logging de errores
- Respuestas de error consistentes
- Validación de IDs numéricos
- Manejo de casos edge

### ✅ **Estructura**
- Corrección del typo en schema (unitPrice)
- Rutas organizadas con prefijo `/api`
- Middleware de autenticación consistente
- Variables de entorno validadas

### ✅ **Funcionalidad**
- Filtros en productos
- Verificación de productos activos
- Manejo de stock en carrito
- Endpoints de salud y documentación

