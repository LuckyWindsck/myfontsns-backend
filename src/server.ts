import { app, sequelize } from './app';

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Example app listening at http://localhost:${port}`);
});
