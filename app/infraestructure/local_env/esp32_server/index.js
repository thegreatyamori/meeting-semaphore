import express from "express";

const port = 6336;
const app = express();

app.get('/', (req, res) => res.send({ message: "hello" }));

app.get('/healthcheck', (req, res) => res.send({ status: "alive" }));

app.get('/led', (req, res) => res.send(req.query));

app.listen(port);

console.log(`Server running on http://localhost:${port}`);
