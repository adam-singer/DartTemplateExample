#!/bin/bash

# To process a template, run this script with the path to a .tmpl file, e.g.,
#
# $ $DART/utils/template/template srcfile [outfile]
#
# where:
#    srcfile - the template file file.tmpl (if .tmpl missing .tmpl is assumed).
#    outfile - the Dart class file to generate, if outfile not specified then
#              outfile is srcfile.dart (srcfile name w/o ext).
#
# To use your Dart VM must be on your $PATH e.g.,
#
# export PATH=$PATH:/home/<your name>/dart-all/dart/out/Release_ia32/


PATH=$PATH:~/dart_bleeding/dart/out/Debug_ia32/
#DART_REPO=~/dart_bleeding/dart
DART_REPO=./
#echo $DART_REPO/dart/util/template $1
#$DART_REPO/utils/template/template DivisionSales

echo
echo "Building dart templates"
echo 


for i in $(find . -name '*.tmpl'); do
     dartTemplateName=`echo $i|sed 's/\.tmpl$//g'`
     $DART_REPO/utils/template/template ${dartTemplateName}
done

echo
echo "Copy & Paste import statements"
echo 
for i in $(find . -name '*.tmpl'); do
     dartTemplateName=`echo $i|sed 's/\.tmpl$//g'|sed 's/^\.\///g'`
     echo \#source\(\'${dartTemplateName}.dart\'\)\;
done

echo
