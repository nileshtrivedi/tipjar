#!/bin/bash

deploy_mode=${1:-all}

install_web_dependencies () {
  echo "installing web dependencies..."
  cd web
  npm install
  echo "done installing web dependencies."
}

install_functions_dependencies () {
  echo "installing functions dependencies..."
  cd functions
  npm install
  echo "done installing functions dependencies."
}

build_web_dist () {
  echo "building web dist..."
  cd web
  npm run build
  echo "done building web dist."
}

if [ $deploy_mode = "all" ]; then
  echo "deploy mode: $deploy_mode"
  install_web_dependencies && build_web_dist &
  install_functions_dependencies &
  wait
  echo "deploying $deploy_mode..."
  firebase deploy
fi

if [ $deploy_mode = "hosting" ]; then
  install_web_dependencies && build_web_dist
  echo "deploying $deploy_mode..."
  firebase deploy --only hosting
fi

if [ $deploy_mode = "functions" ]; then
  install_functions_dependencies &
  echo "deploying $deploy_mode..."
  firebase deploy --only functions
fi
