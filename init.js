import app from "./app";

const PORT = 5000;

const handleListening = () => console.log(`Listening on https://localhost:${PORT}`);

app.listen(PORT, handleListening);