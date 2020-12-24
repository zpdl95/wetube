"scripts": {
    "dev:server": "nodemon --exec babel-node src/init.js --delay 1 --ignore 'scss'",
    "dev:assets": "cd src && cross-env WEBPACK_ENV=development webpack -w",
    "build:assets": "cd src && cross-env WEBPACK_ENV=production webpack",
    "build:server": "babel src --out-dir build --ignore 'src/assets','src/static','src/webpack.config.js'",
    "copyAll": "cp -R src/static build && cp -R src/views build",
    "build": "npm run build:server && npm run build:assets && npm run copyAll",
    "start": "set PRODUCTION=true node build/init.js",
    "tunnel": "lt --port 4000"