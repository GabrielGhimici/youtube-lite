import { RootComponent } from './app/root-component';

function bootStrapApp() {
  console.log("First app");
  const app = new RootComponent();
  app.init();
  app.render();
}

bootStrapApp();
