import db from "./sql.js";
import express from 'express';
import sql from "./sql.js";

const router = express.Router();

const addOrder = async (data) => {
    let {order_date, deliver_date, deliver_method, deliver_location, customer, promotion, order_status, notes} = data;
    query = `INSERT INTO purchases (order_date, deliver_date, deliver_method, deliver_location, customer, promotion, order_status, notes)
             VALUES("${order_date}", "${deliver_date}", "${deliver_method}", "${deliver_location}", ${customer}, ${promotion}, "${order_status}", "${notes}")`;
    await db.query(query, (err, result) => {
        if (err) throw err;
        else {
            console.log("Insert done");
        }
    }); 
};

const queryOrder = async () => {
    query_origin = `select orders.order_id, orders.order_date, orders.deliver_date, orders.deliver_method, orders.deliver_location,
                    customers.customer_name, orders.order_status, orders.notes, sum(orders_detail.quantity * products.price) as 'total'
                    from orders 
                        left join orders_detail on orders.order_id = orders_detail.order_id
                        left join products on orders_detail.product_id = products.product_id
                        left join customers on customers.customer_id = orders.customer
                        left join promotions on promotions.promotion_id = orders.promotion
                        group by orders.order_id;`;
    query_detail = `select orders.order_id, products.product_name, orders_detail.quantity, (orders_detail.quantity * products.price) as money from orders
                        left join orders_detail on orders.order_id = orders_detail.order_id
                        left join products on orders_detail.product_id = products.product_id
                        left join customers on customers.customer_id = orders.customer
                        left join promotions on promotions.promotion_id = orders.promotion;`
                        
    origin = await db.query(query_origin, function(err, rows) {
        if(err) throw err;
        return rows;
    }); 
    detail = await db.query(query_detail, function(err, rows) {
        if(err) throw err;
        return rows;
    }); 
};

router.post('/', async (req, res) => {
    console.log(req.body);
    await addPurchase(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.get("/", async (_, res) => {
    sql.query("SELECT * FROM purchases", (err, result) => {
        if (err) throw err;
        else {
        console.log("Query done");
        res.json({ result });
        }
    });
});