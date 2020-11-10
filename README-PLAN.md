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
8. npm install @babel/node and @babel/core / babel은 최신코드를 옛코드로 변경시킴, 여기선 node용 babel을 설치
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
20. npm install dotenv / dotenv는 숨겨야 할 데이터를 작성할 수 있음. .gitignore에 꼭 포함시킬것
21. npm install multer / multer은 파일을 넣으면 URL로 변환해주는 미들웨어
22. npm install eslint -D / eslint는 코드문제 감지 모듈. -D는 개발자용으로 설치. [1. npm install -D eslint 설치 2. npx eslint --init 3. > To check syntax, find problems, and enforce code style 4.- > JavaScript modules (import/export) -> None of these -> No -> Node -> Use a popular ~ -> Airbnb -> Javascript -> Yes(eslint 관련 플러그인 자동설치) 5. vscode eslint 확장팩 설치]
23. npm install prettier -D / 코드 정리 모듈
24. npm install eslint-plugin-prettier -D / prettier를 eslint 규칙으로 실행 시켜 주는 모듈
25. npm install eslint-config-prettier -D / prettier와 eslint의 충돌점을 보완해주는 모듈
26. npm install webpack webpack-cli / webpack은 파일에서 사용하기위해, webpack-cli는 터미널에서 사용하기위해. webpack = module bundler (모듈을 묶어서 static하게 만들어줌. 신→구)


단축키: Ctrl+c 터미널 나가기
prettier랑 typescript 둘다 포맷프로그램이라서 typescript를 꺼야 prettier가 사용 가능하다