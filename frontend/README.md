# Slack Clone

Una aplicación de mensajería inspirada en Slack construida con React.

## Características

- Autenticación de usuarios (registro, login, recuperación de contraseña)
- Creación y gestión de espacios de trabajo
- Canales de comunicación
- Interfaz responsive
- Rutas protegidas

## Tecnologías

- **React** 19.0.0
- **React Router DOM** 7.1.5
- **Vite** - Build tool
- **React Icons** - Iconografía
- **React Responsive** - Diseño adaptativo
- **React Split Pane** - Paneles divididos

## Instalación

```bash
cd frontend
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Estructura de Rutas

- `/` - Pantalla principal
- `/register` - Registro de usuario
- `/login` - Inicio de sesión
- `/reset-password` - Recuperar contraseña
- `/workspaces` - Lista de espacios de trabajo
- `/workspace/:workspace_id` - Espacio de trabajo específico
- `/workspace/:workspace_id/channel/:channel_id` - Canal específico
- `/create-workspace` - Crear nuevo espacio de trabajo
