{
  "name": "wetube",
  "version": "1.0.0",
  "description": "Cloning Youtube with Vanilla and NodeJS",
  "author": "Nicolás Serrano Arévalo",
  "dependencies": {
    "@babel/cli": "^7.1.5",
    "@babel/core": "^7.1.5",
    "@babel/node": "^7.0.0",
    "@babel/polyfill": "^7.0.0",
    "@babel/preset-env": "^7.1.5",
    "autoprefixer": "^9.3.1",
    "aws-sdk": "^2.361.0",
    "axios": "^0.18.0",
    "babel-loader": "^8.0.4",
    "body-parser": "^1.18.3",
    "connect-mongo": "^2.0.1",
    "cookie-parser": "^1.4.3",
    "css-loader": "^1.0.1",
    "dotenv": "^6.1.0",
    "express": "^4.16.4",
    "express-session": "^1.15.6",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "get-blob-duration": "^1.0.0",
    "helmet": "^3.15.0",
    "mongoose": "^5.3.12",
    "morgan": "^1.9.1",
    "multer": "^1.4.1",
    "multer-s3": "^2.9.0",
    "node-sass": "^4.10.0",
    "passport": "^0.4.0",
    "passport-facebook": "^2.1.1",
    "passport-github": "^1.1.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^5.0.1",
    "postcss-loader": "^3.0.0",
    "pug": "^2.0.3",
    "sass-loader": "^7.1.0",
    "webpack": "^4.25.1",
    "webpack-cli": "^3.1.2"
  },
  /* 아래의 내용이 babel사용시 필수! */
  "babel":{
    "presets":["@babel/preset-env"]
  },
  "scripts": {
    "dev:server": "nodemon --exec babel-node src/init.js --delay 2 --ignore '.scss' --ignore 'static' ",
    "dev:assets": "cd src && WEBPACK_ENV=development webpack -w",
    "build:assets": "cd src && WEBPACK_ENV=production webpack",
    /* --out-dir or -d : 하위파일 전부
    "build:server": "babel src --out-dir build --ignore 'src/assets','src/static','src/webpack.config.js'",
    /* mac명령어
    /* 'cp:copy'
    /* -R:하위폴더와 파일 전부'
    "copyAll": "cp -R src/static build && cp -R src/views build",
    "build": "npm run build:server && npm run build:assets && npm run copyAll",
    /* mac명령어
    /* 'rm:폴더를 삭제'
    /* -r:하위폴더와 파일 전부'
    /* -f:경고없이'
    "prebuild": "rm -rf build",
    "tunnel": "lt --port 4000",
    "start": "PRODUCTION=true node build/init.js",
    "prestart": "npm run build"
  },
  "devDependencies": {
    "eslint": "^5.9.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-config-prettier": "^3.3.0",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-prettier": "^3.0.0",
    "nodemon": "^1.18.6",
    "prettier": "^1.15.2"
  }
}