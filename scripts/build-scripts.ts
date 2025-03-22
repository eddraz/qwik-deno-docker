#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Directorios
const SCRIPTS_DIR = path.resolve('src/scripts');
const OUTPUT_DIR = path.resolve('public/scripts');

// Asegurarse de que el directorio de salida exista
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Limpiar el directorio de salida
console.log('Limpiando directorio de salida...');
fs.readdirSync(OUTPUT_DIR).forEach((file) => {
  const filePath = path.join(OUTPUT_DIR, file);
  fs.rmSync(filePath, { recursive: true, force: true });
});

// Compilar archivos TypeScript
console.log('Compilando archivos TypeScript...');
try {
  execSync('tsc -p tsconfig.scripts.json', { stdio: 'inherit' });
} catch (error) {
  console.error('Error al compilar archivos TypeScript:', error);
  process.exit(1);
}

// Eliminar archivos no deseados
console.log('Eliminando archivos no deseados...');
const unwantedFiles = ['.eslintrc.cjs', '.eslintrc.cjs.map'];
unwantedFiles.forEach((file) => {
  const filePath = path.join(OUTPUT_DIR, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Eliminado: ${filePath}`);
  }
});

console.log('Compilación completada exitosamente!');
