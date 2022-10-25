import fs from "fs";

let number = 0;

const genNumber = () => {
  number = Math.floor(Math.random() * 100);
  fs.writeFile("./number.txt", String(number), (e) => {
    if (e) throw e;
  });
};

const getNumber = () => {
  fs.readFile("./number.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    number = data;
  });
  return number;
};

export { genNumber, getNumber };
