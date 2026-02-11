import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();

const saveUser = async (name, subject, score) => {
  const existing = await ScoreCard.findOne({ name, subject });
  if (existing) {
    try {
      await ScoreCard.updateOne({ name, subject }, { name, subject, score });
      console.log("Updated user");
      return "Updating";
    } catch {
      console.log("User update error");
    }
  } else {
    try {
      const newUser = new ScoreCard({ name, subject, score });
      await newUser.save();
      console.log("Created user");
      return "Adding";
    } catch (e) {
      console.log("User creation error");
      throw new Error("User creation error: " + e);
    }
  }
};

const queryUser = async (type, queryString) => {
  const query =
    type === "name"
      ? await ScoreCard.find({ name: queryString })
      : await ScoreCard.find({ subject: queryString });
  if (query.length > 0) {
    const x = [];
    for (const q of query) {
      x.push(`Found card with ${type}: (${q.name}, ${q.subject}, ${q.score})`);
    }
    return x;
  } else {
    console.log("Not Found.");
    return `${type} (${queryString}) not found!`;
  }
};
const clearDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    return "Database cleared";
  } catch (e) {
    throw new Error("Database deletion failed");
  }
};

router.delete("/cards", async (req, res) => {
  const clear = await clearDB();
  res.json({
    message: clear,
  });
});
router.post("/card", async (req, res) => {
  const status = await saveUser(
    req.body.name,
    req.body.subject,
    req.body.score
  );
  res.json({
    message: `${status} (${req.body.name}, ${req.body.subject}, ${req.body.score})`,
    card: true,
  });
});
router.get("/cards", async (req, res) => {
  const query = await queryUser(req.query.type, req.query.queryString);
  res.json(
    typeof query !== "string"
      ? {
          messages: query,
        }
      : { message: query }
  );
});
export default router;
