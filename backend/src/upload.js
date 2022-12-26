const example = [
  {
    id: "1",
    name: "brunch",
    amount: 1000,
    date: new Date("2022-12-05T07:00:00.360Z").getTime(),
    category: "FOOD",
    description: "Too expensive.",
  },
  {
    id: "2",
    name: "MRT",
    amount: 30,
    date: new Date("2022-12-05T08:30:00.360Z").getTime(),
    category: "TRANSPORT",
    description: "Go to school.",
  },
  {
    id: "3",
    name: "protection money",
    amount: 1000,
    date: new Date("2022-12-05T12:00:00.360Z").getTime(),
    category: "OTHER",
    description: "",
  },
  {
    id: "4",
    name: "ointment",
    amount: 100,
    date: new Date("2022-12-05T15:00:00.360Z").getTime(),
    category: "HEALTH",
    description: "I broke my leg on my way home QQ.",
  },
  {
    id: "5",
    name: "salary",
    amount: 2000,
    date: new Date("2022-12-06T19:00:00.360Z").getTime(),
    category: "INCOME",
    description: "Math tutor.",
  },
];

const dataInit = async (db) => {
  let query = "DELETE FROM items";
  await db.query(query);
  for (const data of example) {
    let { id, name, amount, category, description } = data;

    query = `INSERT INTO items(id, name, amount, category, description)
             VALUES(${id}, "${name}", ${amount}, "${category}", "${description}")`;
    await db.query(query, (err, result) => {
      if(err) throw err
      else{
        return result
      }
    });
  }
  await db.query("SELECT * FROM items WHERE id in (1,3)", (err, result) => {
    if (err) throw err;
    else {
      console.log(result[0].id)
      // for (const i in result[0]) {

      //   console.log(i);
      // }
    }
  });
  console.log("Database initialized!");
};

export { dataInit };
