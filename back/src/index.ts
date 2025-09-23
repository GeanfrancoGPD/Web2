import express from "express";
import cors from "cors";
import path from "path";


const app = express();
    app.use(cors()); // permite llamadas desde el frontend en dev 
    
    app.use(express.json());
    const PORT = process.env.PORT || 3000;

    // Endpoints de ejemplo
    app.get('/api/hello', (req, res) => {
        res.json({ message: 'Hola desde el backend (Express + TypeScript)!' });
    });
    
    app.post('/api/echo', (req, res) => {
        // devuelve lo que llegó en el body
        res.json({ received: req.body });
    });

    // En producción: servir la carpeta 'public' (donde pondrás la build de Angular)
    const publicPath = path.join(__dirname, '..', 'public');
    app.use(express.static(publicPath));

    // fallback: enviar index.html para rutas del frontend (SPA)
    app.use((req, res) => {
        const indexHtml = path.join(publicPath, 'index.html');
        res.sendFile(indexHtml);
    });

    app.listen(PORT, () => {
        console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
    });