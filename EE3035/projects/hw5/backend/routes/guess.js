import express from "express";
import { genNumber, getNumber } from "../core/getNumber";
const router = express.Router();

router.post("/start", (_, res) => {
  genNumber(); // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
  res.json({ msg: "The game has started." });
});

router.get("/guess", (req, res) => {
  let answer = getNumber();
  let input = req.query.number;
  if (
    isNaN(input) ||
    (!isNaN(input) && (Number(input) < 1 || Number(input) > 100))
  ) {
    res.status(406).send({ msg: "Not a legal number." });
  } else if (Number(input) > answer) {
    res.json({ msg: "Smaller" });
  } else if (Number(input) < answer) {
    res.json({ msg: "Bigger" });
  } else {
    res.json({ msg: "Equal" });
  }
});
router.post("/restart", (_, res) => {
  genNumber(); // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
  res.json({ msg: "The game has restarted." });
});
export default router;
