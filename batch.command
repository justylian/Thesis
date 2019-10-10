#! /bin/bash
mydir="$(dirname "$BASH_SOURCE")"
cd $mydir
open -a Google\ Chrome --args --disable-web-security --user-data-dir
ng serve --host 0.0.0.0 --disableHostCheck