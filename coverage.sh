#!/bin/sh

find coverage -name "lcov.info" -exec sed -e 's/ /\\ /g' -e 's/(/\\(/g' -e 's/)/\\)/g' '{}' \; | codeclimate
