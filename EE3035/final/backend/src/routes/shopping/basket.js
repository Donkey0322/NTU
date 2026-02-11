import db from "../../sql.js";
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

let query = (customer_id) => {
  return `select basket_id,
                   customers.customer_id, 
                   customers.customer_name, 
                   products.product_id,
                   products.product_name, 
                   basket.quantity, 
                   products.price, 
                   tmp_tbl.img
              from basket
              left join customers 
                on customers.customer_id = basket.customer_id
              left join products 
                on products.product_id = basket.product_id
             inner join (
                   select distinct product_name, 
                                first_value(image) over (partition by product_name order by RAND()) as img from basket
                    inner join customers c on basket.customer_id = c.customer_id
                    inner join products p on basket.product_id = p.product_id
                    inner join images i on p.product_id = i.product_id) tmp_tbl
                on tmp_tbl.product_name = products.product_name
             where customers.customer_id = ${customer_id}`;
};

router.get("/", async (req, res) => {
  console.log(res.locals);
  const { customer_id } = req.query;
  let get = query(customer_id);
  const result = await Myquery(get);
  res.status(200).send({ result });
});

router.post("/", async (req, res) => {
  const { customer_id, product_id, quantity } = req.body;
  let insert = `INSERT INTO basket (customer_id, product_id, quantity)
             VALUES(${customer_id}, ${product_id}, ${quantity})`;
  await Myquery(insert);
  let update = query(customer_id);
  update =
    update +
    ` order by basket.basket_id desc 
                        limit 1`;
  console.log(update);
  const result = await Myquery(update);
  console.log(update);
  res.status(200).send({ result });
});

router.delete("/", async (req, res) => {
  const { basket_id } = req.query;
  let query1 = `delete from basket
    where basket_id = ${basket_id}`;

  let query2 = `select customer_id from basket where basket_id = ${basket_id}`;
  const customer = await Myquery(query2);
  const customer_id = customer[0].customer_id;
  await Myquery(query1);
  let return_query = query(customer_id);
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
  res.status(200).send();
});

export default router;
