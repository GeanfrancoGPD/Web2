import { SERVER_URL } from './config.js';

import app from './middleware.js';
import { dbConnection } from './db.js';

import { createControllers } from './controllers.js';
import { createRoutes } from './routes.js';

dbConnection(app)
  .then(async () => {
    await createControllers(app);
    await createRoutes(app);

  })
  .catch((err) => {
    console.log('Error connecting to db ', err);
  });

process.on('uncaughtException', function (err) {
  console.log(err);
});
