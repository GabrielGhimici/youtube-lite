import { Router } from './router/router';
import 'bootstrap';

function bootStrapApp() {
  const router:Router = new Router();
  const app = router.getAppInstance();
  if (app !== null) {
    app.init();
    app.render();
  }
}

bootStrapApp();
