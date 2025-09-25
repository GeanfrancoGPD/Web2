export const createAndUpdateSession = (req) => {
  createSession(req);
  updateSession(req);
}

export const createSession = (req) => {
  if (!req.session.data) {
    req.session.data = {};
  }
}

export const updateSession = (req) => {
  let userData = JSON.parse(req.headers.data || '{}');
  if (!req.session.data) {
    req.session.data = {};
  }
  req.session.data = { ...req.session.data, ...userData };
  return req.session.data;
}

export const destroySession = (req) => {
  req.session.destroy(err => {
    if (err) {
      return { errorCode: 500, message: 'Error al cerrar sesión' };
    }
  });
  return { message: 'Sesión cerrada correctamente' };
}

export const getSession = (req) => {
  return req.session.data || {};
}

export const existSession = (req) => {
  if (req.session.data && Object.keys(req.session.data).length > 0) {
    return true;
  } else {
    return false;
  }
}

