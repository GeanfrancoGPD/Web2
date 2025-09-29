import { SERVER_URL } from '../config.js';
import bcrypt from 'bcrypt';
import { validateUsername, validateEmail, validatePassword, validateConfirmPassword } from './validations.js';
import { createAndUpdateSession, destroySession, getSession, existSession } from '../utils/sessionManager.js';
import { generateToken, verifyToken } from '../utils/tokenManager.js';
import { sendRecoveryEmail } from '../utils/emailService.js';

export const createRoutes = async (app) => {

  app.get('/', (req, res) => {
    res.send('API is running');
  });

  app.get('/login', async (req, res) => {

    if (existSession(req, res)) {
      return res.send({ message: `Ya has iniciado sesión. Cierra la sesión para continuar.`, redirect: '/home' });
    }

    const userData = req.body || JSON.parse(req.headers.data || '{}');

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
    let userData = req.body || JSON.parse(req.headers.data || '{}');
    console.log(userData);
    const { username, email, password, confirmPassword } = userData;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).send({ errorCode: 400, message: 'Por favor llene todos los campos', userData});
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

  app.get('/logout', async (req, res) => {
    if (!existSession(req)) {
      res.send({ message: 'No has iniciado sesión.', redirect: '/login' });
      return;
    }
    const result = await destroySession(req);
    res.send(result);
  });

  app.get('/home', async (req, res) => {
    if (!existSession(req)) {
      res.send({ message: 'Debes iniciar sesión para acceder a esta página.', redirect: '/login' });
      return;
    }

    const sessionData = getSession(req);
    const message = `Bienvenido a la página principal, ${sessionData.username || 'invitado'}`;
    res.send({ message, sessionData });
    return;
  });

  app.get('/forgotPassword', async (req, res) => {
    // Validar el email que viene en los headers
    let userData = req.body || JSON.parse(req.headers.data || '{}');
    const { email } = userData;
    if (!email) {
      return res.status(400).send({ errorCode: 400, message: 'Por favor ingrese su email' });
    }
    const emailError = validateEmail(email);
    if (emailError) {
      return res.status(400).send({ errorCode: 400, message: emailError });
    }

    // Busca el usuario con ese email usando la ruta /findUsers
    await fetch(`${SERVER_URL}/findUsers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', data: JSON.stringify({ email }) },
    })
    .then(response => response.json())
    .then(data => {
      if (data?.users?.length > 0) {
        // Si se encuentra el usuario, enviar un email con el token de recuperación
        if (data.users.length > 1) {
          return res.status(400).send({ errorCode: 400, message: 'Se han encontrado múltiples usuarios con ese email. Por favor contacte al soporte.' });
        }
        const user = data.users[0];
        const token = generateToken({ user, email: user.email, userId: user._id });
        // sendRecoveryEmail(user.email, token);
        // res.send({ 
        //   message: 'Se ha enviado un email de recuperación',
        //   userId: user._id,
        //   email: user.email,
        //   token,
        // });
        res.send({ 
          message: 'Se ha emulado el envío del email de recuperación',
          userId: user._id,
          email: user.email,
          token,
        });
      } else {
        res.status(404).send({ errorCode: 404, message: 'Usuario no encontrado' });
      }
    })
    .catch(error => {
      console.error('Error al buscar usuario:', error);
      res.status(500).send({ errorCode: 500, message: 'Error al buscar usuario' });
    });
  });

  app.get('/resetPassword', async (req, res) => {
    // Validar el token que viene en los headers
    let userData = req.body || JSON.parse(req.headers.data || '{}');
    const { token, password, confirmPassword, userId } = userData;
    if (!token) {
      return res.status(500).send({ errorCode: 500, message: 'Error del servidor al conseguir el token' });
    }

    if (!userId) {
      return res.status(500).send({ errorCode: 500, message: 'Error del servidor al conseguir el id de usuario' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(400).send({ errorCode: 400, message: 'Token inválido o expirado. Por favor intente nuevamente' });
    }

    if (!password || !confirmPassword) {
      return res.status(400).send({ errorCode: 400, message: 'Por favor llene todos los campos' });
    }

    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    if (passwordError) {
      return res.status(400).send({ errorCode: 400, message: passwordError });
    }
    if (confirmPasswordError) {
      return res.status(400).send({ errorCode: 400, message: confirmPasswordError });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const updatedUser = { ...decoded.user, password: hashedPassword };

    await fetch(`${SERVER_URL}/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
      res.send({ message: `Contraseña actualizada correctamente para el usuario . Por favor inicie sesión con su nueva contraseña.`, redirect: '/login' });
    })
    .catch(error => {
      console.error('Error al actualizar la contraseña:', error);
      res.status(500).send({ errorCode: 500, message: 'Error al actualizar la contraseña. El email ingresado no está asociado a ningún usuario registrado.' });
    });
  });

  app.get('/findUsers', async (req, res) => {
    // Buscar coincidencias de usuarios que contengan por lo menos un dato igual de los que se envían a través de headers.data
    const userData = req.body || JSON.parse(req.headers.data || '{}');
    const keys = Object.keys(userData);
    if (keys.length === 0) {
      return res.status(400).send({ errorCode: 400, message: 'Por favor ingrese al menos un criterio de búsqueda' });
    }
    
    await fetch(`${SERVER_URL}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        const users = data?.filter(u => u && (
          keys.some(key => userData[key] && u[key] && u[key].includes(userData[key]))
        ));
      res.send({ users });
    });
  });
};