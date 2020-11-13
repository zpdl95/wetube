# WeTube

Cloning Youtube with Vanilla and NodeJS

0. nodejs 설치 and 커맨드창에 node -v 로 버전확인
1. create xx.js
2. npm init
3. npm install express / express는 서버를 만드는 프레임워크임
4. create .gitignore and add node_modules, package-lock.json, 표준gitignore
5. git init / 깃레포지토리를 생성
6. GET, POST / GET은 요청을 한다(예 웹사이트를 불러옴). POST는 정보를 보낸다(예 아이디를 보냄)
7. get(req, res) req는 요청이고 res는 반응이다
8. npm install @babel/node and @babel/core / babel은 최신코드를 옛코드로 변경시킴, 여기선 node용 babel을 설치. 코드는 신버전인데 브라우저는 구버전이라서 그렇다.
9. npm install @babel/preset-env / babel 프리셋을 설치 env는 최신버전을 거의다 커버함 실험은 제외
10. .babelrc 파일 생성 and 프리셋 설정
11. npm install nodemon -D / nodemon설치 -D 개발자용으로 설치(앱요구사항이 아님) nodemon은 저장할때마다 서버를 재시작함
12. npm install morgan / morgan은 무슨일이 언제 일어났는지 기록함, 만들어진 express의 미들웨어
13. npm install helmet / helmet은 서버 보안을 위한 프로그램
14. npm install body-parser / body-parser은 body의 내용을 볼 수 있도록 변환시킴, express의 미들웨어
15. npm install cookie-parser / cookie-parser은 cookie에 유저의 정보를 저장함, session을 다룸, express의 미들웨어
16. 파일을 쪼개서 모듈화를 만듬
17. npm install pug / pug는 앱에 view를 담당함. express의 view engine이고 템플릿임. app.set()에 사용
18. mongodb 설치 community sever / mongodb는 DB임. 환경변수 설정필수, 커맨드창에 mongod 로 확인
19. npm install mongoose / mongoose는 mongodb와 nodejs를 연결해줌
20. npm install dotenv / dotenv는 환경변수 라이브러리다. '.env'파일안에 변수 값을 생성한다. dotenv는 숨겨야 할 데이터를 작성할 수 있음. .gitignore에 꼭 포함시킬것
21. npm install multer / multer은 파일을 넣으면 URL로 변환해주는 미들웨어
22. npm install eslint -D / eslint는 코드문제 감지 모듈. -D는 개발자용으로 설치. [1. npm install -D eslint 설치 2. npx eslint --init 3. > To check syntax, find problems, and enforce code style 4.- > JavaScript modules (import/export) -> None of these -> No -> Node -> Use a popular ~ -> Airbnb -> Javascript -> Yes(eslint 관련 플러그인 자동설치) 5. vscode eslint 확장팩 설치]
23. npm install prettier -D / 코드 정리 모듈
24. npm install eslint-plugin-prettier -D / prettier를 eslint 규칙으로 실행 시켜 주는 모듈
25. npm install eslint-config-prettier -D / prettier와 eslint의 충돌점을 보완해주는 모듈
26. npm install webpack webpack-cli / webpack은 파일에서 사용하기위해, webpack-cli는 터미널에서 사용하기위해. webpack = module bundler (모듈을 묶어서 static하게 만들어줌. 신→구). package.json에서 사용할때 -w 옵션은 파일을 보면서 변화가 있으면 다시 실행 시켜주는 것
27. npm install (extract-text-webpack-plugin@next)→(mini-css-extract-plugin)변경 / webpack의 plugin프로그램이다. @next, @는 버전선택의 옵션 next는 최신버전(beta)
28. npm install cross-env / cross-env는 환경변수 라이브러리다. 터미널환경에서 변수를 사용할 수 있음. mac/linux에서는 필요없음
29. npm install autoprefixer / postcss-loader의 옵션으로 웹브라우저와 호환되게 내용을 덧붙여줌.
30. npm install css-loader postcss-loader sass-loader / loader plugin을 전부 설치
31. npm install node-sass / sass-loader에 추가적으로 필요한듯 보임
32. npm install babel-loader / ES6자바스크립트를 구버전으로 변환
33. npm install @babel/polyfill / 브라우저는 async 같은 최신버전 코드를 이해하지 못한다. 브라우저에 없는 것(최신코드)을 모방해서 사용함
34. npm install passport-local-mongoose / mongoose용 passport플러그인을 설치. passport는 미들웨어로 인증기능을 가지고 있다. passport는 쿠키를 생성하고, 브라우저에 저장시켜주고, 유저에게 해당 쿠키를 준다. 그리고 이 passport가 브라우저에서 '자동'으로 쿠키를 가져와서 인증이 완료된 user object를 controller에 넘겨준다. passport는 다른 모듈들도 지원한다(깃허브, 페북, 스팀 등등 다른 아이디로도 인증가능). 사용자 기능을 추가함. User model을 위한것(database)
35. npm install passport passport-local / passport는 passport이고, passport-local은 username과 password를 쓰는 사용자인증방식(strategy)을 의미함


단축키: Ctrl+c 터미널 나가기
prettier랑 typescript 둘다 포맷프로그램이라서 typescript를 꺼야 prettier가 사용 가능하다

쿠키: 우리가 브라우저에 저장할 수 있는 것들, 모든 요청(request)에 대해서 백엔드로 전송될 정보들이 담겨있다. 브라우저 상에 쿠키를 설정해주면 그 쿠키를 통해 사용자 ID를 알 수 있다. 웹사이트에서 쿠키를 가지고 있는 클라이언트가 서버에 요청을 할때 브라우저가 자동으로 그 쿠키를 서버로 전송한다.

serialize: 웹브라우저에 있는 사용자에 대해서 어떤 정보를 가질 수 있느냐, 사용자에게 어떤 쿠키를 줄것이냐(이 사용자의 ID는 1이다)
serialization: 어떤 field가 쿠키에 포함될 것인가
deserialize: 어느 사용자인지 어떻게 찾는가, 사용자가 가지고 있는 쿠키 정보를 가지고 어떻게 해당 사용자인지 확인 할 것인가