export interface UIComponent {
  readonly id: number;
  componentHtml: HTMLElement;
  onInit(): void;
  onDestroy(): void;
  init(config?: {[key: string]: any}): void;
  render(): void;
  destroy(): void;
  addChild(component: UIComponent): boolean;
  removeChild(children: number): boolean;
  getChildren(): Array<UIComponent>;
  setParent(component: UIComponent | null): boolean;
  getParent(): UIComponent | null;
}
