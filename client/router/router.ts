import { Singleton } from '../core/decorators/singleton';
import { RootComponent } from '../app/root-component';
import { AccountContainerComponent } from '../app/app-access/account-container.component';
import { UIComponent } from '../app/generic-components/ui-component';
import { LoginElement } from '../app/app-access/login.element';
import { NotFoundElement } from '../app/not-found.element';
import { Component } from '../app/generic-components/component';
import { SignUpElement } from '../app/app-access/sign-up.element';

const RouteConfig = {
  '': {
    component: RootComponent,
    redirectTo: 'app',
    children: {
      'app': {},
      'account': {
        component: AccountContainerComponent,
        redirectTo: 'login',
        children: {
          'login': {
            component: LoginElement
          },
          'register': {
            component: SignUpElement
          }
        }
      }
    }
  }
};

@Singleton()
export class Router {
  private readonly config;
  constructor() {
    this.config = RouteConfig;
    console.log(this.config);
  }

  public getAppInstance(): UIComponent {
    const location = window.location;
    const pathChain = location.pathname.split('/');
    let instance: UIComponent | null = null;
    if (pathChain[pathChain.length - 1] === '') {
      pathChain.splice(pathChain.length - 1, 1);
    }
    let internalConfig = this.config;
    let traverseComponent: UIComponent;
    for(let i = 0; i < pathChain.length; i++) {
      internalConfig = internalConfig[pathChain[i]];
      if (internalConfig) {
        if (instance === null) {
          traverseComponent = new internalConfig.component;
          instance = traverseComponent;
        } else {
          const newComponent = new internalConfig.component;
          traverseComponent.addChild(newComponent);
          newComponent.setParent(traverseComponent);
          traverseComponent = newComponent;
        }
        if (internalConfig.children) {
          internalConfig = internalConfig.children
        }
      } else {
        const newComponent = new NotFoundElement();
        (instance as Component).clearChildList();
        instance.addChild(newComponent);
        newComponent.setParent(instance);
      }
    }
    console.log(instance);
    console.log(location);
    console.log(pathChain);
    return instance;
  }

  public redirectTo(path: Array<string>, context) {
    
  }
}
