import { Router } from './router/router';
import 'bootstrap';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './core/store/root.reducer';
import { RootEpics } from './core/store/root.epics';
import { createLogger } from 'redux-logger';

const epicMiddleware = createEpicMiddleware();
const middlewareEnhancer = applyMiddleware(createLogger(), epicMiddleware);
export const store = createStore(rootReducer, middlewareEnhancer);
RootEpics.createEpics().forEach((epic) => {
  epicMiddleware.run(epic);
});

function bootStrapApp() {
  const router:Router = new Router();
  const app = router.getAppInstance();
  if (app !== null) {
    app.init();
    app.render();
  }
}

bootStrapApp();
