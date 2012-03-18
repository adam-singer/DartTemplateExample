#!/bin/bash

#
# Script exports needed libraries for using the new Dart Template system
#

#REPO_UTILS_URI=../../dart_bleeding/dart/utils
REPO_UTILS_URI=http://dart.googlecode.com/svn/branches/bleeding_edge/dart/utils
rm -rf utils
mkdir utils
cd utils
svn export $REPO_UTILS_URI/lib lib
svn export $REPO_UTILS_URI/css css
svn export $REPO_UTILS_URI/template template
