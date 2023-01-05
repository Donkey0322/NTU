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

const combine = (product_result, img_result) => {
  for (var i of product_result) {
    let id = i.product_id;
    i.img = [];
    for (var j of img_result) {
      if (j.product_id === id) {
        i.img.push(j.image);
      }
    }
  }
  return product_result;
};

const sort = (method) => {
  let sort_by = "";
  let join = "";
  switch (method) {
    case "high_to_low": {
      sort_by = `order by price desc`;
      break;
    }
    case "low_to_high": {
      sort_by = `order by price`;
      break;
    }
    case "sale": {
      join = `left join orders_detail on products.product_id = orders_detail.product_id`;
      sort_by = `group by products.product_id, products.product_name, products.price, products.description
                        order by sum(quantity) desc`;
      break;
    }
    default:
      break;
  }
  return [sort_by, join];
};

router.get("/", async (req, res) => {
  // console.log(res.locals)
  const { section, method } = req.query;
  let query = "";
  let category = "";
  let sort_by = "";
  let join = "";
  if (section === "hot") {
    switch (method) {
      case "high_to_low": {
        sort_by = `order by price desc`;
        break;
      }
      case "low_to_high": {
        sort_by = `order by price`;
        break;
      }
      case "sale": {
        query = `select products.product_id, products.product_name,  products.price, products.description from products
                    left join orders_detail on products.product_id = orders_detail.product_id
                    where products.selling = 1
                    group by products.product_id, products.product_name, products.price, products.description
                    order by sum(quantity) desc
                    limit 10`;
      }
      case null:
      default:
        break;
    }
    if (method !== "sale") {
      query = `select products.product_id, products.product_name,  products.price, products.description from products
            inner join 
                (select products.product_id from products
                left join orders_detail on products.product_id = orders_detail.product_id
                group by products.product_id, products.product_name, products.price, products.description
                order by sum(quantity) desc
                limit 10) as t2 
            on products.product_id = t2.product_id
            where products.selling = 1
            ${sort_by}`;
    }
  } else if (section === "canele") {
    category = 1;
    let a = sort(method);
    sort_by = a[0];
    join = a[1];
  } else if (section === "cake") {
    category = 2;
    let a = sort(method);
    sort_by = a[0];
    join = a[1];
  } else if (section === "cookie") {
    category = 3;
    let a = sort(method);
    sort_by = a[0];
    join = a[1];
  } else if (section === "set") {
    category = 4;
    let a = sort(method);
    sort_by = a[0];
    join = a[1];
  } else {
    let a = sort(method);
    sort_by = a[0];
    join = a[1];
    query = `select products.product_id, products.product_name,  products.price, products.description from products
                 ${join}
                 where selling = 1
                 ${sort_by}`;
  }
  if (category) {
    query = `select products.product_id, products.product_name,  products.price, products.description from products
        ${join}
        where products.category = ${category} and products.selling = 1
        ${sort_by}`;
  }
  let img_query = `select images.product_id, images.image from images 
    inner join( ${query} ) as t
    on images.product_id = t.product_id;`;
  var product_result = await Myquery(query);
  var img_result = await Myquery(img_query);
  const result = combine(product_result, img_result);
  res.status(200).send({ result });
});

export default router;
