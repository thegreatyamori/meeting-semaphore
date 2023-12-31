#!/bin/bash

# This script accepts a parameter and prints it

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 set-version (v0.0.0)"
    exit 1
fi

version=$1
message=$2
path=$(pwd)

npm version $version --no-git-tag-version --prefix $path

git add .
git commit -m "release tag $version"
git tag $version -m "$message"
git push origin $version
git push origin main
echo "New version available: $version"
