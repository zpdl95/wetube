import express from 'express'; /*앞은 ES6버전, 뒤는 구버전*/ /*const express = required('express')*/
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

// middlewares
app.use(cookieParser());/*쿠키를 전달받아 사용함, (예 사용자 인증)*/
app.use(bodyParser.json());/*사용자가 웹사이트로 전달하는 정보를 검사, form이나 json형태로 된 body를 검사*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());/*앱이 더 안전하게 사용됨*/
app.use(morgan("dev"));/*앱에서 나오는 모든 기록을 남김*/

// routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;