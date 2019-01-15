import { Singleton } from '../core/decorators/singleton';
import { RootComponent } from '../app/root-component/root.component';
import { AccountContainerComponent } from '../app/access/account-container-component/account-container.component';
import { UIComponent } from '../core/generic-components/ui-component';
import { LoginElement } from '../app/access/login-element/login.element';
import { NotFoundElement } from '../app/not-found-element/not-found.element';
import { Component } from '../core/generic-components/component';
import { SignUpElement } from '../app/access/sign-up-element/sign-up.element';
import { MainPageComponent } from '../app/main/main-page-component/main-page.component';
import { VideoPageComponent } from '../app/main/video-page/video-page.component';
import { MainContainerComponent } from '../app/main/main-container.component';
import { SearchPageComponent } from '../app/main/search-page-component/search-page.component';

const RouteConfig = {
  '': {
    component: RootComponent,
    redirectTo: 'app',
    children: {
      'app': {
        component: MainContainerComponent,
        redirectTo: 'main',
        children: {
          'main' : {
            component: MainPageComponent
          },
          'video/@id': {
            component: VideoPageComponent
          },
          'search': {
            component: SearchPageComponent
          }
        }
      },
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
      let partialMatch = [];
      if (internalConfig) {
        partialMatch = Object.keys(internalConfig)
          .filter(el => el.indexOf(pathChain[i]) !== -1 && el.indexOf('@id') !== -1);
        if (partialMatch.length) {
          if (pathChain[i + 1] && !isNaN(Number(pathChain[i + 1]))) {
            pathChain[i] = `${pathChain[i]}/@id`;
            pathChain.splice(i + 1, 1);
          }
        }
        internalConfig = internalConfig[pathChain[i]];
      }
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
          if (internalConfig.redirectTo && pathChain.indexOf(internalConfig.redirectTo) < 0 && !pathChain[i + 1]) {
            this.redirectTo([internalConfig.redirectTo]);
          }
          internalConfig = internalConfig.children;
        }
      } else {
        const newComponent = new NotFoundElement();
        (instance as Component).clearChildList();
        instance.addChild(newComponent);
        newComponent.setParent(instance);
      }
    }
    //console.log(instance);
    console.log(location);
    console.log(pathChain);
    return instance;
  }

  public redirectTo(path: Array<string>) {
    const pathName = window.location.pathname;
    let pathChain = pathName.split('/');
    if (pathChain[pathChain.length - 1] === '') {
      pathChain.splice(pathChain.length - 1, 1);
    }
    path.forEach((elem) => {
      if (elem === '..') {
        pathChain.splice(pathChain.length - 1, 1);
      } else if (elem === '/') {
        pathChain = [];
      } else {
        pathChain.push(elem);
      }
    });
    if (pathChain.length && pathChain.indexOf('') < 0) {
      pathChain.unshift('');
    }
    const joinedPath = pathChain.join('/');
    console.log(joinedPath, window.location.pathname);
    if (window.location.pathname !== joinedPath) {
      window.location.pathname = joinedPath;
    }
  }
}
