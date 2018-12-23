import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
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
        type: 'application/vnd.api+json'
      }))
      .use(bodyParser.urlencoded({
        extended: true
      }));
    return null;
  }

  public $onServerInitError(error: any): any {
    console.error(error);
  }
}

new Server().start();
