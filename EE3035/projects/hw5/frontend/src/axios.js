import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000/api/guess" });
const startGame = async () => {
  try {
    const {
      data: { msg },
    } = await instance.post("/start");
    return msg;
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(new Error("500: Internal Server Error"));
    });
  }
};
const guess = async (number) => {
  let errorMessage = "";
  // 比大小
  try {
    const {
      data: { msg },
    } = await instance.get("/guess", { params: { number } });
    return msg;
  } catch (error) {
    errorMessage = "500: Internal Server Error";
    if ("response" in error && error.response.status === 406) {
      alert(`Error: "${number}" is not a valid number (1 - 100)`);
      errorMessage = "406: Not acceptable";
    }
    return new Promise((resolve, reject) => {
      reject(new Error(errorMessage));
    });
  }
};
const restart = async () => {
  try {
    const {
      data: { msg },
    } = await instance.post("/restart");
    return msg;
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(new Error("500: Internal Server Error"));
    });
  }
};
export { startGame, guess, restart };
