import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import { Db } from "mongodb";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware de logging para todas las peticiones
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Rutas
app.use("/auth", authRoutes);

// Conectar a MongoDB
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI no está definido en las variables de entorno");
  process.exit(1);
}

// Función para configurar la base de datos (ejecutar solo una vez)
async function setupDatabase() {
  try {
    // Verificar si ya existe un usuario de prueba
    const existingUser = await User.findOne({ username: "testuser" });
    if (existingUser) {
      console.log("⚠️ Usuario de prueba ya existe en la base de datos");
      return;
    }

    // Crear usuario de prueba
    const testUser = {
      username: "testuser",
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10)
    };

    const user = new User(testUser);
    await user.save();
    console.log("✅ Usuario de prueba creado exitosamente");
    console.log("🔑 Credenciales de prueba:");
    console.log("   Username: testuser");
    console.log("   Password: password123");
    console.log("   Email: test@example.com (para verificación)");
  } catch (error) {
    console.error("❌ Error configurando la base de datos:", error.message);
  }
}

// Conectar a MongoDB antes de iniciar el servidor
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB Atlas");
    //! await User.deleteOne({ email: "ericksemprun2@gmail.com" })
    //! await User.deleteOne({ username: "Ejempr"})
    // //ver usuarios
    // const emails = await User.find().select('email');
    // console.log("Usuarios en la base de datos:", emails);
    // // ver contraseñas hasheadas
    // const passwords = users.map(user => user.password);
    // console.log("Contraseñas hasheadas:", passwords);


    // Configurar la base de datos (solo una vez)
    await setupDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error de conexión a MongoDB:", err.message);
    process.exit(1);
  });
