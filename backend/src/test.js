import express from "express";
const router = express.Router();
import sql from "./sql.js";

router.get("/", async (_, res) => {
  sql.query("SELECT * FROM items", (err, result) => {
    if (err) throw err;
    else {
      console.log("Query done");
      res.json({ result });
    }
  });
});

export default router;
