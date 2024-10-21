#!/usr/bin/env bash

# Check if the 'dist' folder exists
if [ -d "dist" ]; then
  echo "The 'dist' folder exists. Deleting it..."
  rm -rf dist
  echo "'dist' folder deleted."
fi

npm run start
