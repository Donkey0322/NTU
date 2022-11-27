const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};
const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};
const broadcastMessage = (wss, ws, data, status) => {
  wss.clients.forEach((client) => {
    if (client.box === ws.box) {
      console.log(client.box);
      sendData(data, client);
      sendStatus(status, client);
    }
  });
};

export { broadcastMessage };
