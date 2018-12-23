import { Router } from './router/router';

function bootStrapApp() {
  const router:Router = new Router();
  const app = router.getAppInstance();
  if (app !== null) {
    app.init();
    app.render();
  }
}

bootStrapApp();
