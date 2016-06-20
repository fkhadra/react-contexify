#!/bin/sh

rm -rf dist/*

./node_modules/.bin/webpack --output-filename=dist/ReactContexify.js
./node_modules/.bin/webpack --output-filename=dist/ReactContexify.min.js --optimize-minimize

./node_modules/.bin/babel src -d lib
./node_modules/.bin/gulp style

rm -rf gulp-ruby-sass-0/