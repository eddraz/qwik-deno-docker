// Implementación del método
if (typeof String.prototype.prueba !== "function") {
    String.prototype.prueba = function (char = undefined) {
        console.log("prueba", char);
        return char === null || char === void 0 ? void 0 : char.toLowerCase();
    };
}
export {};
//# sourceMappingURL=prototypes.js.map