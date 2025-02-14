import dotenv from "dotenv"


// Carga las variables de entorno desde el archivo .env al process
dotenv.config()

const ENVIRONMENT = {
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    URL_BACKEND: process.env.URL_BACKEND,
    URL_FRONTEND: process.env.URL_FRONTEND
}

export default ENVIRONMENT