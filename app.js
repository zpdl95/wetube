import express from 'express'; /*앞은 ES6버전, 뒤는 구버전*/ /*const express = required('express')*/
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {userRouter} from "./router";
const app = express();

const handleHome = (req, res) => res.send("hello from home");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter);
/*export default는 이 페이지 데이터를 줄때 기본적으로 주는것*/
export default app;