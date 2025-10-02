export const createRoutes = async (app) => {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
};