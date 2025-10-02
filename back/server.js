import { SERVER_URL } from './config.js';

import app from './src/middleware.js';
import { dbConnection } from './src/db.js';

import { createControllers } from './src/controllers.js';
import { createRoutes } from './src/routes.js';
import { createSessionRoutes } from './src/session/sessionRoutes.js';

dbConnection(app)
  .then(async () => {
    await createControllers(app);
    await createRoutes(app);
    await createSessionRoutes(app);

  })
  .catch((err) => {
    console.log('Error connecting to db ', err);
  });

process.on('uncaughtException', function (err) {
  console.log(err);
});
