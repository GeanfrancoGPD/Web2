import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ¿Ya existe el usuario?
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: "El usuario ya existe" });

    // Hashear contraseña
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashed });
    await user.save();

    res.json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("🔍 Petición de login recibida:", {
      method: req.method,
      url: req.url,
      body: req.body,
      headers: req.headers
    });

    const { username, password } = req.body;

    // Validar que se envíen username y contraseña
    if (!username || !password) {
      console.log("❌ Error: Username o contraseña faltantes");
      return res.status(400).json({ error: "Username y contraseña son requeridos" });
    }

    // Buscar usuario en la base de datos por username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ Error: Usuario no encontrado:", username);
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("❌ Error: Contraseña incorrecta para usuario:", username);
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login exitoso para usuario:", username);
    res.json({ 
      token, 
      username: user.username, 
      email: user.email 
    });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
