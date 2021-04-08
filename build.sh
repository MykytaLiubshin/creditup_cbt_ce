#!/usr/bin/bash 

yarnpkg build

rm -rf dist/styles
rm -rf dist/index.html

cp build-utils/additions/index.html dist/index.html
cp -r  build-utils/additions/styles dist/styles

