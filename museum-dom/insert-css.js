const path = require('path');
const fs = require('fs');
const csso = require('csso');

// Путь к собранному HTML файлу
const htmlFilePath = path.resolve(__dirname, './dist/index.html');

// Путь к CSS файлу, который нужно вставить
const cssFilePath = path.resolve(__dirname, './src/css/critical.css');

// Считываем содержимое CSS файла
let cssContent = fs.readFileSync(cssFilePath, 'utf-8');

// Минифицируем CSS код с помощью csso
cssContent = csso.minify(cssContent).css;

// Читаем HTML файл
let html = fs.readFileSync(htmlFilePath, 'utf-8');

// Вставляем CSS внутрь тега <style>
html = html.replace('<style></style>', `<style>${cssContent}</style>`);

// Записываем обновленный HTML файл
fs.writeFileSync(htmlFilePath, html, 'utf-8');
