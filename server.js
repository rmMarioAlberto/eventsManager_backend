import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import auth from './routes/authRoutes.js'; // Ensure the correct file extension

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para parsear JSON
app.use(express.json());

import './config/pgConfig.js'; // Ensure this file is also using ES module syntax

// Rutas de la API
app.use('/auth', auth);

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Servidor funcionando correctamente' });
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});