# WeTube

Cloning Youtube with Vanilla and NodeJS 0. nodejs 설치

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
    단축키: Ctrl+c 터미널 나가기
