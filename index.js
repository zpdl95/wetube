import express from 'express'; /*앞은 ES6버전, 뒤는 구버전*/ /*const express = required('express')*/
const app = express();

const PORT = 4000;
/*const name = () => content*/ /*ES6버전, 에로우펑션*/
const handleListening = () => console.log(`Listening on: https://localhost:${PORT}`);

const handleHome = (req, res) => res.send("hello from home");

const handleProfile = (req, res) => res.send("You are on my profile");

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);