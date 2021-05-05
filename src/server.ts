import app from './lib/app';
import db from './lib/db';

interface ServerOptions {
  port?: number | string
}
class Server {
  public readonly app;

  public readonly port: number | string;

  public readonly db;

  constructor(option?: ServerOptions) {
    this.app = app;
    this.db = db;

    this.port = option?.port || 3000;
  }

  async authenticate() {
    try {
      await this.db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  listen() {
    this.app.listen(this.port, async () => {
      await this.authenticate();
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

export default Server;
