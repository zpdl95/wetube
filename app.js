import express from 'express'; /*앞은 ES6버전, 뒤는 구버전*/ /*const express = required('express')*/
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { localsMiddlewares } from './middlewares';
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

// middlewares
// app.use(helmet());/*앱이 더 안전하게 사용됨*/
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
    });/* 임시 사용 */
app.set("view engine", "pug");
/* ⬇ 방식의 코드 사용은 css등 프론트엔드에 사용을하고 지금은 임시로 사용함*/
app.use("/uploads", express.static("uploads"));/* 해당 디렉토리로 가면 static에 적은 디렉토리에서 파일을 보내주는 미들웨어 */
app.use(cookieParser());/*쿠키를 전달받아 사용함, (예 사용자 인증)*/
app.use(bodyParser.json());/*사용자가 웹사이트로 전달하는 정보를 검사, form이나 json형태로 된 body를 검사*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));/*앱에서 나오는 모든 기록을 남김*/
app.use(localsMiddlewares)
// routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;