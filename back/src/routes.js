import { SERVER_URL } from '../config.js';
import bcrypt from 'bcrypt';
import { validateUsername, validateEmail, validatePassword, validateConfirmPassword } from './validations.js';
import { createAndUpdateSession, destroySession, getSession, existSession } from '../utils/sessionManager.js';

export const createRoutes = async (app) => {

  app.get('/', (req, res) => {
    res.send('API is running');
  });

  app.get('/login', async (req, res) => {

    if (existSession(req, res)) {
      return res.send({ message: `Ya has iniciado sesión. Cierra la sesión para continuar.`, redirect: '/home' });
    }

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
            createAndUpdateSession(req);
            return res.send({ message: `Bienvenido ${user.username}` });
          } else {
            return res.status(401).send({ errorCode: 401, message: 'Credenciales inválidas' });
          }
        } else {
          return res.status(404).send({ errorCode: 404, message: 'Usuario no encontrado' });
        }
    }).catch(error => {
      console.error('Error fetching users:', error);
      return res.status(500).send({ errorCode: 500, message: 'Error del servidor' });
    });
  });

  app.post('/register', async (req, res) => {
    let userData = JSON.parse(req.headers.data || '{}');
    const { username, email, password, confirmPassword } = userData;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).send({ errorCode: 400, message: 'Por favor llene todos los campos' });
    }

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    if (usernameError) {
      return res.status(400).send({ errorCode: 400, message: usernameError });
    }
    if (emailError) {
      return res.status(400).send({ errorCode: 400, message: emailError });
    }
    if (passwordError) {
      return res.status(400).send({ errorCode: 400, message: passwordError });
    }
    if (confirmPasswordError) {
      return res.status(400).send({ errorCode: 400, message: confirmPasswordError });
    }

    const saltRounds = 10;
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
      .then(message => res.send({ message }))
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send({ errorCode: 500, message: 'Error al iniciar sesión' });
      });
    })
    .catch(error => {
      console.error('Error al registrar usuario:', error);
      res.status(500).send({ errorCode: 500, message: 'Error al registrar usuario' });
    });
  });

  app.get('/logout', (req, res) => {
    if (!existSession(req)) {
      res.send({ message: 'No has iniciado sesión.', redirect: '/login' });
      return;
    }
    const result = destroySession(req);
    res.send(result);
  });

  app.get('/home', (req, res) => {
    if (!existSession(req)) {
          res.send({ message: 'Debes iniciar sesión para acceder a esta página.', redirect: '/login' });
          return;
    }

    const sessionData = getSession(req);
    const message = `Bienvenido a la página principal, ${sessionData.username || 'invitado'}`;
    res.send({ message, sessionData });
    return;
  });
};