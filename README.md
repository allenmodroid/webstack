# webstack
git add --all
git commit -am "<commit message>"
git push

# =========
brew install bfg
bfg --strip-blobs-bigger-than 90M

# =========
json-server --watch db.json

# =========
ionic serve --lab

# =========
screenshot --fullpage

# =========
git reset --hard origin/master
git pull origin master

# =========
You need to add cordova whitelist under your project. Try the following -
$ cordova plugin add cordova-plugin-whitelist

# =========
When looking to refresh - not necessary;
ionic platform remove ios
ionic platform remove android