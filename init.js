import app from "./app";

const PORT = 7000;

const handleListening = () => console.log(`✅ Listening on https://localhost:${PORT}`);

app.listen(PORT, handleListening);