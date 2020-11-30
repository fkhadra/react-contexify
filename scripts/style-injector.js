const { readFile, writeFile } = require('fs/promises');
const { resolve, join } = require('path');

const distPath = resolve(__filename, '../../dist');

(async function() {
  try {
    const style = await readFile(
      join(distPath, 'ReactContexify.min.css'),
      'utf-8'
    );

    await writeFile(
      join(distPath, 'inject-style.js'),
      `
"use strict";

Object.defineProperty(exports, "__esModule", {value: true});
exports.injectStyle = injectStyle;
function injectStyle() {
  var style = "${style}";
    
  var css = document.createElement('style');
  css.innerText = style;
  document.head.appendChild(css);
}`
    );

    await writeFile(
      join(distPath, 'inject-style.d.ts'),
      `
/**
 * Inject the style in case you cannot import the css file
 */
export declare function injectStyle(): void;

    `
    );
    console.log('Style genreated 😎 !');
  } catch (error) {
    console.log(error);
  }
})();
