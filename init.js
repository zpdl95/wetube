import app from "./app";
import "./db";

const PORT = 7000;

const handleListening = () => console.log(`✅ Listening on https://localhost:${PORT}`);

app.listen(PORT, handleListening);