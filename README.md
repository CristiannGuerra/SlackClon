# Slack Clone

Aplicación de mensajería inspirada en Slack con frontend React y backend Node.js.

## Características

- Autenticación completa (registro, login, verificación por email, reset password)
- Creación y gestión de espacios de trabajo
- Canales de comunicación con mensajes en tiempo real
- Sistema de invitaciones a workspaces
- Interfaz responsive

## Tecnologías

### Frontend
- **React** 19.0.0
- **React Router DOM** 7.1.5
- **Vite** - Build tool
- **React Icons** - Iconografía

### Backend
- **Node.js** con Express.js
- **MongoDB** con Mongoose
- **JWT** para autenticación
- **bcrypt** para encriptación
- **Nodemailer** para emails

## Instalación

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Variables de Entorno (Backend)

```
PORT=3000
MONGO_DB_URL=mongodb://localhost:27017/slack-clone
SECRET_KEY_JWT=your-secret-key
GMAIL_USERNAME=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
URL_BACKEND=http://localhost:3000
URL_FRONTEND=http://localhost:5173
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Registro de usuario
- `GET /api/auth/verify-email` - Verificación de email
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/reset-password` - Reset password
- `PUT /api/auth/rewrite-password` - Actualizar password
- `GET /api/auth/me` - Obtener usuario actual

### Workspaces
- `POST /api/workspace` - Crear workspace
- `GET /api/workspace` - Obtener workspaces del usuario
- `GET /api/workspace/:workspace_id` - Obtener workspace específico
- `POST /api/workspace/:workspace_id/invite/:invited_id` - Invitar usuario

### Channels
- `POST /api/channel/:workspace_id/channels` - Crear canal
- `GET /api/channel/:workspace_id/channels` - Obtener canales
- `GET /api/channel/:workspace_id/channels/:channel_id` - Obtener canal específico

### Messages
- `POST /api/channel/:channel_id/messages` - Enviar mensaje
- `GET /api/channel/:channel_id/messages` - Obtener mensajes del canal
