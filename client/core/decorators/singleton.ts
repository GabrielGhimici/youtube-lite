export function Singleton() {
  return (targetConstructor) => {
    const originalConstructor = targetConstructor;
    function instantiate(constructor: any, ...args: any[]) {
      if (!originalConstructor.instance) {
        originalConstructor.instance = new constructor(...args);
      }
      return originalConstructor.instance;
    }
    const newConstructor = function(...args: any[]) {
      return instantiate(originalConstructor, ...args);
    };
    newConstructor.prototype = originalConstructor.prototype;
    return newConstructor as any;
  }
}
