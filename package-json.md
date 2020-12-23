{
  "name": "wetube",
  "version": "1.0.0",
  "description": "Cloning Youtube with Vanilla and NodeJS",
  "author": "Choi Jae Won",
  "dependencies": {
    "@babel/cli": "^7.12.10",
    "@babel/core": "^7.12.3",
    "@babel/node": "^7.12.1",
    /* babel/polyfill는 async같은것을 옛코드로 바꿔주기 위해 사용 */
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.12.1",
    "autoprefixer": "^10.0.2",
    "axios": "^0.21.0",
    "babel-loader": "^8.2.1",
    "body-parser": "^1.19.0",
    "connect-mongo": "^3.2.0",
    "cookie-parser": "^1.4.5",
    "cross-env": "^7.0.2",
    "css-loader": "^5.0.1",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-flash": "0.0.2",
    "express-session": "^1.17.1",
    "get-blob-duration": "^1.1.2",
    "helmet": "^4.1.1",
    "mini-css-extract-plugin": "^1.3.0",
    "mongoose": "^5.10.11",
    "morgan": "^1.10.0",
    "multer": "^1.4.2",
    "node-sass": "^5.0.0",
    "passport": "^0.4.1",
    "passport-facebook": "^3.0.0",
    "passport-github": "^1.1.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^6.0.1",
    "postcss-loader": "^4.0.4",
    "pug": "^3.0.0",
    "sass-loader": "^10.0.5",
    "webpack": "^5.4.0",
    "webpack-cli": "^4.2.0"
  },
  "scripts": {
      /* nodemon 세이브 할때마다 서버를 재시작함 */
      /* babel-node init.js파일은 최신코드로 작성됬기때문에 babel기능이 있는 node를 사용해 실행시킴 */
    "dev:server": "nodemon --exec babel-node init.js --delay 1 --ignore 'scss'",
    "dev:assets": "cd src && cross-env WEBPACK_ENV=development webpack -w",
    "build:assets": "cd src && cross-env WEBPACK_ENV=production webpack",
    /* src폴더의 자바스크립트 파일들을 build폴더로 컴파일 */
    "build:server": "babel src --out-dir build --ignore 'src/assets','src/static','src/webpack.config.js'",
    /* '/e:비어있는경우포함 현디렉터리와 하위디렉터리를 복사',
    /* '/h:숨겨진 파일과 시스템 파일도 복사',
    /* '/c:오류가 생겨도 계속',
    /* '/y:기존파일을 덮어쓸지 묻지않음'
    /* '/i:대상을 찾을 수 없고 두 파일 이상을 복사하면 대상을 디렉터리로 지정'
    "copyAll":"xcopy src\\static build\\static /e /h /c /y /i && xcopy src\\views build\\views /e /h /c /y /i",
    "build": "npm run build:server && npm run build:assets && npm run copyAll",
    /* cmd명령어
    /* 'rd:폴더를 삭제'
    /* /s:하위폴더와 파일 전부'
    /* /q:경고없이'
    "prebuild": "rd /s/q build",
    "start": "node build/init.js"
  },
  "devDependencies": {
    "eslint": "^7.12.1",
    "eslint-config-airbnb-base": "^14.2.0",
    "eslint-config-prettier": "^6.15.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-prettier": "^3.1.4",
    "nodemon": "^2.0.6",
    "prettier": "^2.1.2"
  }
}
