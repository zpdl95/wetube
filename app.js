import express from "express"; /*앞은 ES6버전, 뒤는 구버전*/ /*const express = required('express')*/
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import { localsMiddlewares } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

import "./passport";

const app = express();

// middlewares
// app.use(helmet());/*앱이 더 안전하게 사용됨*/
/* 이것을 비활성화 해야 테스트할때 영상이 보임 */
app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
/* ⬇ 방식의 코드 사용은 css등 프론트엔드에 사용하고,(로컬에서 사용할때) 지금은 임시로 사용함*/
/* 해당 디렉토리로 가면 static에 적은 디렉토리에서 파일을 보내주는 미들웨어 */
app.use("/uploads", express.static("uploads"));
/* '/static'경로로 가게 되면 static폴더에 있는 파일을 보내준다 */
app.use("/static", express.static("static"));
/* 요청된 쿠키를 추출함. req에 cookies속성이 부여됨*/
app.use(cookieParser());
/* 사용자가 웹사이트로 전달하는 정보를 검사, form이나 json형태로 된 body를 검사*/
app.use(bodyParser.json());
/* body데이터를 받고 그 안의 객체들을 사용할려면 true를 설정해야됨 */
app.use(bodyParser.urlencoded({ extended: true }));
/* 앱에서 나오는 모든 기록을 남김 */
app.use(morgan("dev"));
/* 서버에 session사용 및 옵션을 설정 */
app.use(
  session({
    /* session의 ID를 랜덤문자를 이용해 암호화 함 */
    secret: process.env.COOKIE_SECRET,
    /* session을 강제로 저장함 */
    resave: true,
    /* 초기화되지 않은(uninitialized)세션을 저장소에 저장함 */
    /* 로그인 session에 이용하려면, false를 선택하는 것이 유용함 */
    saveUninitialized: false,
  })
);
/* passport 초기화 및 구동 */
/* passport가 쿠키를 보고 해당하는 사용자를 찾음,
그리고 그 사용자를 request의 object, 즉 req.user로 만들어줌*/
app.use(passport.initialize());
/* 세션 연결 */
app.use(passport.session());
/* 로컬미들웨어를 만들어 전역변수처럼 사용 */
app.use(localsMiddlewares);

// routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
