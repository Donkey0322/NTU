import db from "../sql.js";
import express from "express";

const router = express.Router();

const Myquery = (query) => {
  return new Promise((resolve) => {
    db.query(query, (err, result) => {
      if (err) {
        throw err;
      } else {
        resolve(result);
      }
    });
  });
};

router.get("/", async (req, res) => {
  const { customer_id } = req.query;
  console.log(req.query);
  let query = `select basket_id, customers.customer_id, customers.customer_name, products.product_id, products.product_name, basket.quantity, products.price
                from basket
                left join customers on customers.customer_id = basket.customer_id
                left join products on products.product_id = basket.product_id  
                where customers.customer_id = ${customer_id}`;
  const result = await Myquery(query);
  res.status(200).send({ result });
});

router.post("/", async (req, res) => {
  const { customer_id, product_id, quantity } = req.body;
  let query = `INSERT INTO basket (customer_id, product_id, quantity)
             VALUES(${customer_id}, ${product_id}, ${quantity})`;
  await Myquery(query);
  query = `select basket_id, customers.customer_id, customers.customer_name, products.product_id, products.product_name, basket.quantity, products.price
             from basket
                left join customers on customers.customer_id = basket.customer_id
                left join products on products.product_id = basket.product_id  
                where customers.customer_id = ${customer_id}
             order by basket.basket_id desc
             limit 1`;
  const result = await Myquery(query);
  res.status(200).send({ result });
});

router.delete("/", async (req, res) => {
  const { basket_id } = req.body;
  let query = `delete from basket
    where basket_id = ${basket_id}`;
  let query2 = `select customer_id from basket where basket_id = ${basket_id}`;
  const customer = await Myquery(query2);
  const customer_id = customer[0].customer_id;
  await Myquery(query);
  let return_query = `select basket_id, customers.customer_id, customers.customer_name, products.product_id, products.product_name, basket.quantity, products.price
                        from basket
                        left join customers on customers.customer_id = basket.customer_id
                        left join products on products.product_id = basket.product_id  
                        where customers.customer_id = ${customer_id}`;
  const result = await Myquery(return_query);
  res.status(200).send({ result });
});

router.put("/", async (req, res) => {
  console.log(req.body);
  const { basket_id, quantity } = req.body;
  let query = `update basket set
                    quantity = ${quantity}
                    where basket_id = ${basket_id}`;
  await Myquery(query);
  // query = `select customer_id from basket where basket_id = ${basket_id}`
  // const customer = await Myquery(query);
  // const customer_id = customer[0].customer_id;
  // let return_query = `select * from basket where customer_id = ${customer_id}$;`;
  // const result = await Myquery(return_query)
  // res.status(200).send({result})
});

export default router;
