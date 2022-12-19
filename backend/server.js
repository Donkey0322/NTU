import express from "express";
import http from "http";
import dotenv from "dotenv-defaults";
import mongo from "./mongo";
import wsConnect from "./wsConnect";
import mongoose from "mongoose";
import WebSocket from "ws";

mongo.connect();
const app = express();
app.get("/", () => {
  console.log("Hello");
});
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected!");
  wss.on("connection", (ws) => {
    ws.box = ""; //用來記錄目前 active ChatBox name
    ws.name = "";
    ws.onmessage = wsConnect.onMessage(wss, ws);
    ws.onclose = wsConnect.onClose(wss, ws);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
