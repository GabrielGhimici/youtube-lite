import { Service } from '@tsed/common';
import { ConnectionOptions, createConnection } from 'typeorm';
import * as Path from 'path';

@Service()
export class ConnectionManager {
  private settings: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'youtube_lite',
    username: 'root',
    password: 'admin',
    entities: [
      Path.join(__dirname, '/api/model/*.js'),
    ],
    logging: true
  };

  private readonly _connection;

  constructor() {
    this._connection = createConnection(this.settings);
  }

  public get connection() {
    return this._connection;
  }
}
