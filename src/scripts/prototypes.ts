// Extender el prototipo de String en TypeScript
declare global {
  interface String {
    prueba(char?: string): string | undefined;
  }
}

// Implementación del método
if (typeof String.prototype.prueba !== "function") {
  String.prototype.prueba = function (char: string | undefined = undefined) {
    console.log("prueba", char);
    return char?.toLowerCase();
  };
}

// Necesario para que este archivo sea tratado como un módulo
export {};
