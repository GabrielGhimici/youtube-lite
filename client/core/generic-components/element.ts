import { UIComponent } from './ui-component';

export class Element implements UIComponent{
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
    this.onInit();
  }
  public render(): void {
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.appendChild(this.componentHtml);
    }
  }
  public destroy(): void {
    this.onDestroy();
  }

  public addChild(component: UIComponent): boolean {
    console.error('Permission denied to add a child');
    return false;
  }

  public removeChild(children: number): boolean {
    console.error('Permission denied to remove a child');
    return false;
  }

  public getChildren(): Array<UIComponent> {
    console.error('Permission denied to retrieve children');
    return [];
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
