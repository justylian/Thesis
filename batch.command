#! /bin/bash
cd socket-server
node index.js
cd ..
cd thesis-app
ng serve 
open -a Google\ Chrome --args --disable-web-security --user-data-dir