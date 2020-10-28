import express from 'express'; /*앞은 ES6버전, 뒤는 구버전*/ /*const express = required('express')*/
const app = express();

const PORT = 4000;
/*const name = () => content*/ /*ES6버전, 에로우펑션*/
const handleListening = () => console.log(`Listening on: https://localhost:${PORT}`);

const handleHome = (req, res) => res.send("hello from home");

const handleProfile = (req, res) => res.send("You are on my profile");
/*middlewares 첫요청과 마지막반응 사이에 존재하는것*/
/*next인자가 필요함 전달용*/
const betweenHome = (req, res, next) => {
    console.log('between');
    next();
}

app.use(betweenHome);

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);