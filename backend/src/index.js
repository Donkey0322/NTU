import sql from "./sql.js";
import httpServer from "./server.js";
import { dataInit } from "./upload.js";

sql.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  dataInit(sql);
});
const port = process.env.PORT | 4000;

httpServer.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
