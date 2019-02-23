#!/bin/sh

ng build
rm -r atemsfy/ng-atemsfy/
cp -r dist/ng-atemsfy atemsfy/
cd atemsfy
git add .
git commit -m "deploy"
git push heroku master