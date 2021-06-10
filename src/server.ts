import type { Express } from 'express';
import type { Sequelize } from 'sequelize';

import app from './lib/app';
import db from './lib/db';

interface ServerOptions {
  port?: number | string
}
class Server {
  readonly app: Express;

  readonly port: number | string;

  readonly db: Sequelize;

  constructor(option?: ServerOptions | undefined) {
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
