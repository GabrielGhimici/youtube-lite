import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as Path from 'path';
import 'reflect-metadata';
import { ServerLoader, ServerSettings } from '@tsed/common';

@ServerSettings({
  rootDir: Path.resolve(__dirname),
  port: 3000,
  mount: {
    '/api': '${rootDir}/api/**/*.js',
    '/auth': '${rootDir}/authorization/**/*.js',
    '/': '${rootDir}/general/**/*.js'
  },
  logger: {
    logRequest: true
  }
})
export class Server extends ServerLoader {
  public $onMountingMiddlewares(): void|Promise<any> {
    this
      .use(cookieParser())
      .use(compression({}))
      .use(methodOverride())
      .use(bodyParser.json({
        limit: '10mb',
        type: 'application/json'
      }))
      .use(bodyParser.urlencoded({
        extended: true
      }))
      .use(session({
        secret: 'S3CR37K3Y',
        saveUninitialized: true,
        resave: false,
        cookie: {
          expires: new Date(Number(new Date())+24*60*60*1000),
          secure: 'auto',
        }
      }));
    return null;
  }

  public $onServerInitError(error: any): any {
    console.error(error);
  }
}

new Server().start();
