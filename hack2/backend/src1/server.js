import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import db from "./db";
db.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/", routes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is up on port ${port}!`));
