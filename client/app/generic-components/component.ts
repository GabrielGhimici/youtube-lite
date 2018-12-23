import { UIComponent } from './ui-component';

export class Component implements UIComponent {
  readonly id: number;
  public componentHtml: HTMLElement;
  protected parent: UIComponent | null;
  protected children: Array<UIComponent>;

  constructor() {
    this.id = Date.now();
    this.componentHtml = document.createElement('div');
    this.parent = null;
    this.children = [];
  }

  public onInit(): void {}
  public onDestroy(): void {}
  public init(config?: {[key: string]: any}): void {
    if (config && config.parent) {
      this.parent = config.parent;
    }
    if (config && config.children) {
      this.children = config.children.slice();
    }
    this.children.forEach((child: UIComponent) => {
      child.init();
    });
    this.onInit();
  }
  public render(): void {
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.appendChild(this.componentHtml);
    }
    this.children.forEach((child: UIComponent) => {
      child.render();
    })
  }
  public destroy(): void {
    this.children.forEach((child: UIComponent) => {
      child.destroy();
    });
    this.onDestroy();
  }
  public addChild(component: UIComponent, position?: number): boolean {
    if (position === undefined || position >= this.children.length) {
      this.children.push(component);
      return true;
    }
    if (position < 0) {
      return false;
    }
    this.children.splice(position, 0, component);
    component.init();
    this.render();
    return true;
  }
  public removeChild(childID: number): boolean {
    try {
      const childIndex: number = this.children.findIndex((child: UIComponent) => childID === child.id );
      if (childIndex < 0) {
        return false;
      }
      this.children[childIndex].destroy();
      this.children = this.children.splice(childIndex, 1);
      this.render();
      return true;
    } catch (e) {
      console.log('Unable to remove child!', e);
      return false;
    }
  }
  public clearChildList() {
    this.children = [];
  }
  public getChildren(): Array<UIComponent> {
    return this.children;
  }
  public setParent(component: UIComponent | null): boolean {
    try {
      this.parent = component;
      return true;
    } catch (e) {
      console.log('Unable to set parent!', e);
      return false;
    }
  }
  public getParent(): UIComponent | null {
    return this.parent;
  }
}
