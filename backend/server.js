// import http, express, dotenv-defaults, mongoose, WebSocket 
import express from 'express';
import http from 'http';
import dotenv from "dotenv-defaults";
import mongo from './mongo';
import wsConnect from './wsConnect';
import mongoose from 'mongoose';
import WebSocket from 'ws';

mongo.connect();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        ws.box = ''; //用來記錄目前 active ChatBox name
        ws.onmessage = wsConnect.onMessage(wss, ws);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});