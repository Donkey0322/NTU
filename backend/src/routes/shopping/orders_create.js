import db from "../../sql.js";
import express from "express";
import moment from "moment";
import { v4 } from "uuid";
const router = express.Router();

const Myquery = (query, result_array = null) => {
  return new Promise((resolve) => {
    db.query(query, [result_array], (err, result) => {
      if (err) {
        throw err;
      } else {
        resolve(result);
      }
    });
  });
};

function getRandomName() {
  let hexString = v4();
  console.log("hex:   ", hexString);
  hexString = hexString.replace("-", "");
  let base64String = Buffer.from(hexString, "hex").toString("base64");
  console.log("base64:", base64String);
  return base64String;
}

router.post("/", async (req, res) => {
  console.log("Order to add:", req.body);
  let {
    order_date,
    deliver_date,
    deliver_method,
    deliver_location,
    customer,
    order_status,
    notes,
    basket_id,
  } = req.body;
  let query = `select * from basket where basket_id in (?)`;
  const basket_items = await Myquery(query, basket_id);
  const order_code = getRandomName();
  if (deliver_date) {
    if (notes) {
      query = `INSERT INTO orders (order_code, order_date, deliver_date, deliver_method, deliver_location, customer, order_status, notes)
                VALUES("${order_code}", "${moment(order_date).format(
        "YYYY-MM-DD"
      )}", "${moment(deliver_date).format(
        "YYYY-MM-DD"
      )}", "${deliver_method}", "${deliver_location}", ${customer}, "${order_status}", "${notes}")`;
    }
    query = `INSERT INTO orders (order_code, order_date, deliver_date, deliver_method, deliver_location, customer, order_status, notes)
                VALUES("${order_code}", "${moment(order_date).format(
      "YYYY-MM-DD"
    )}", "${moment(deliver_date).format(
      "YYYY-MM-DD"
    )}", "${deliver_method}", "${deliver_location}", ${customer}, "${order_status}", ${notes})`;
  } else {
    if (notes) {
      query = `INSERT INTO orders (order_code, order_date, deliver_date, deliver_method, deliver_location, customer, order_status, notes)
                VALUES("${order_code}", "${moment(order_date).format(
        "YYYY-MM-DD"
      )}", ${deliver_date}, "${deliver_method}", "${deliver_location}", ${customer}, "${order_status}", "${notes}")`;
    }
    query = `INSERT INTO orders (order_code, order_date, deliver_date, deliver_method, deliver_location, customer, order_status, notes)
                VALUES("${order_code}", "${moment(order_date).format(
      "YYYY-MM-DD"
    )}", ${deliver_date}, "${deliver_method}", "${deliver_location}", ${customer}, "${order_status}", ${notes})`;
  }
  await Myquery(query);
  query = `select order_id from orders
           order by order_id desc
           limit 1`;
  const order = await Myquery(query);
  const order_id = order[0].order_id;
  basket_items.map(async (e) => {
    const basket_id = e.basket_id;
    const product_id = e.product_id;
    const quantity = e.quantity;
    query = `insert into orders_detail (order_id, product_id, quantity)
             values(${order_id}, ${product_id}, ${quantity})`;
    await Myquery(query);
    query = `delete from basket where basket_id = ${basket_id}`;
    await Myquery(query);
  });
  res.status(200).send();
  // query =`select basket_id, customers.customer_id, customers.customer_name, products.product_id, products.product_name, basket.quantity, products.price
  // from basket
  // left join customers on customers.customer_id = basket.customer_id
  // left join products on products.product_id = basket.product_id
  // where customers.customer_id = ${customer}`;
  // const result = await Myquery(query);
  // console.log(result)
  // res.status(200).send({result})
});
export default router;
