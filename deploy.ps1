﻿
Set-Location Membros/fuse

ng build --aot --prod 

Set-Location ../..

git add -f wwwroot/. 

git commit -m "Deploy" 

git push --force dokku master 

git reset --hard HEAD~1

