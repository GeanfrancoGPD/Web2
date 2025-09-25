import { SERVER_URL } from './config.js';
import bcrypt from 'bcrypt';

export const createRoutes = async (app) => {

  app.get('/', (req, res) => {
    res.send('API is running');
  });

  app.get('/login', async (req, res) => {
    const userData = JSON.parse(req.headers.data || '{}');

    await fetch(`${SERVER_URL}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
      .then(data => {
        const user = data?.find(u => u && u.username === userData.username);
        if (user) {
          const passwordMatch = bcrypt.compareSync(userData.password, user.password);
          if (passwordMatch) {
            req.session.data = { username: user.username, email: user.email };
            console.log('Sesión iniciada');
            return res.send(`Bienvenido ${user.username}`);
          } else {
            return res.status(401).send('Credenciales inválidas');
          }
        } else {
          return res.status(404).send('Usuario no encontrado');
        }
    }).catch(error => {
      console.error('Error fetching users:', error);
      return res.status(500).send('Error fetching users');
    });

    req.session.data = userData;
  });

  app.post('/register', async (req, res) => {
    const saltRounds = 10;
    let userData = JSON.parse(req.headers.data || '{}');
    const password = userData.password;
    if (!password) {
      return res.status(400).send('La contraseña es requerida');
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Copia el resto de los datos del body y reemplaza la contraseña
    userData = { ...userData, password: hashedPassword };

    await fetch(`${SERVER_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(async data => {
      console.log('Usuario registrado:', data);
      await fetch(`${SERVER_URL}/login`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', data: JSON.stringify(userData) },
      })
      .then(response => response.text())
      .then(message => res.send(message))
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
      });
    })
    .catch(error => {
      console.error('Error al registrar usuario:', error);
      res.status(500).send('Error al registrar usuario');
    });
  });

  app.get('/logout', (req, res) => {
    // Destruir sesión
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al cerrar sesión');
      } else {
        console.log('Sesión cerrada');
        res.send('Cerrar sesión');
      }
    });
  });
};