import app from './lib/app';
import db from './lib/db';

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Example app listening at http://localhost:${port}`);
});
