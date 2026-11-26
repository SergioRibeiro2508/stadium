const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const socketIo = require("socket.io");
const config = require("./config");
let router = require("./router");

const port = Number(process.env.PORT || 5000);
const app = express();

// Render está atrás de um proxy HTTPS (necessário para cookies Secure)
app.set("trust proxy", 1);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.NODE_ENV !== "production" ? process.env.LOCAL_FRONTEND_URL : null,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));

// /health antes de qualquer rota genérica
app.get("/health", (req, res) => res.json({ ok: true }));

mongoose
  .connect(config.db)
  .then(() => console.log("Conection successful!"))
  .catch((err) => console.error(err));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket, new connection", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    socket.disconnect();
  });
});

app.use(router.init(io));
app.use("/images", express.static(path.join(__dirname, "images")));

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});