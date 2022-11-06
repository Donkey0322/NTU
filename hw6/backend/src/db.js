// 連線 DB 函數
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
export default {
  connect: () => {
    dotenv.config();

    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log("DB Connected"))
      .catch((err) => console.log(err));
    const db = mongoose.connection;
    db.on("error", (err) => console.log(err));
  },
};
