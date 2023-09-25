#!/bin/bash

# This script accepts a parameter and prints it

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 set-version (v0.0.0)"
    exit 1
fi

version=$1
message=$2

cd app
npm version $version --no-git-tag-version
cd ..

git tag $version -m $message
git push origin $version
echo "New version available: $version"
