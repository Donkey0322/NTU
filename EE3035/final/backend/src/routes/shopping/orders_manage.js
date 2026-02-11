import db from "../../sql.js";
import express from "express";
import moment from "moment";

const router = express.Router();

const make_dict = (array_c, detail) => {
  var dic = {};
  if (detail) {
    for (var i in array_c) {
      if (Object.keys(dic).includes(String(array_c[i].order_id))) {
        dic[array_c[i].order_id].push(array_c[i]);
      } else {
        dic[array_c[i].order_id] = [];
        dic[array_c[i].order_id].push(array_c[i]);
      }
    }
  } else {
    for (var i in array_c) {
      dic[array_c[i].order_id] = array_c[i];
    }
  }
  return dic;
};

const make_arr = (origin, detail) => {
  var arr = [];
  for (let i of Object.keys(origin)) {
    arr.push({ origin: origin[i], detail: detail[i] });
  }
  return arr;
};

const Myquery = (query, detail) => {
  return new Promise((resolve) => {
    db.query(query, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (!detail) {
          if (result.affectedRows !== 1) {
            result.map((element) => {
              element.order_date = moment(element.order_date).format(
                "YYYY-MM-DD"
              );
              element.order_date = new Date(element.order_date);
              if (element.deliver_date !== null) {
                element.deliver_date = moment(element.deliver_date).format(
                  "YYYY-MM-DD"
                );
                element.deliver_date = new Date(element.deliver_date);
              }
            });
          }
        }
        resolve(result);
      }
    });
  });
};

const queryOrder = async (customer_id) => {
  let query_origin = `select orders.order_id, orders.order_date, orders.deliver_date, orders.deliver_method, orders.deliver_location,
                      customers.customer_name, orders.order_status, orders.notes, sum(orders_detail.quantity * products.price) as 'total'
                      from orders 
                          left join orders_detail on orders.order_id = orders_detail.order_id
                          left join products on orders_detail.product_id = products.product_id
                          left join customers on customers.customer_id = orders.customer
                          where customers.customer_id = ${customer_id}
                          group by orders.order_id
                          order by deliver_date is not null, deliver_date desc;`;
  let query_detail = `select orders.order_id, products.product_name, orders_detail.quantity, (orders_detail.quantity * products.price) as money from orders
                          left join orders_detail on orders.order_id = orders_detail.order_id
                          left join products on orders_detail.product_id = products.product_id
                          left join customers on customers.customer_id = orders.customer
                          where customers.customer_id = ${customer_id}
                          order by deliver_date is not null, deliver_date desc;`;

  let array1 = await Myquery(query_origin, false);
  let origin = make_dict(array1, false);
  let array2 = await Myquery(query_detail, true);
  let detail = make_dict(array2, true);
  var arr = make_arr(origin, detail);
  return arr;
};

router.delete("/", async (req, res) => {
  let { order_id, customer_id } = req.body;
  let query = `delete from orders
                   where order_id = ${order_id}`;
  await Myquery(query, true);
  var result = await queryOrder(customer_id);
  console.log(result);
  res.status(200).send({ result });
});

router.get("/", async (req, res) => {
  const { customer_id } = req.query;
  var result = await queryOrder(customer_id);
  res.status(200).send({ result });
});

router.put("/", async (req, res) => {
  // console.log('Product to update:', req.body.value);
  let { order_id, deliver_method, deliver_location, notes, customer_id } =
    req.body;
  let query = `update orders set
                   deliver_method = "${deliver_method}", 
                   deliver_location = "${deliver_location}",
                   notes = "${notes}"
               where order_id = ${order_id};`;
  await Myquery(query, true);
  var result = await queryOrder(customer_id);
  res.status(200).send({ result });
});

export default router;
