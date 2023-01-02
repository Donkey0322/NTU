import db from "../sql.js";
import express from 'express';


const router = express.Router();

const Myquery = (query) => {
    return new Promise((resolve) => {
        db.query(query,  (err, result) => {
            if (err) {
                throw err;
            }else{
                resolve(result);
            }
        })
    })
}

router.delete('/', async (req, res) => {
    let {id} = req.query;
    console.log(id)
    let query = `delete from products
                 where product_id = ${id}`;
    await Myquery(query)
    let return_query = `select * from products
                        order by selling desc;`;
    var result = await Myquery(return_query)
    res.status(200).send({result})
});

router.get("/", async (_, res) => {
    let query = `select  from products
                 where selling = 1
                 order by selling desc;`;
    var result = await Myquery(query)
    res.status(200).send({result})
});

router.get('/sort', async(req, res) => {
    const method = req.body.method;
    let query = ''
    if(method === 'high_to_low'){
        query = `select * from products
                       where selling = 1
                       order by price desc`
    }else if(method === 'low_to_high'){
        query = `select * from products
                        where selling = 1
                        order by price`
    }else{
        query = `select products.product_id, products.product_name,  products.price, products.description from orders
                        left join orders_detail on orders.order_id = orders_detail.order_id
                        left join products on orders_detail.product_id = products.product_id
                        left join customers on customers.customer_id = orders.customer
                        group by products.product_id, products.product_name, products.price, products.description
                        order by sum(quantity) desc;`
    }
    const result = await Myquery(query);
    console.log(result)
    res.status(200).send({result})
})

router.post('/', async (req, res) => {
    console.log('Product to add:', req.body);
    let {product_name, price, selling} = req.body;
    let query = `INSERT INTO products (product_name, price, selling )
             VALUES("${product_name}", ${price}, ${selling})`;
    await Myquery(query)
    let query_return = `select * from products
                    order by product_id desc
                    limit 1;`
    let result = await Myquery(query_return)
    res.status(200).send({result})
});



router.put('/', async (req, res) => {
    // console.log('Product to update:', req.body.value);
    let {product_id, product_name, price, selling} = req.body.value;
    let query = `update products set
                 product_name = "${product_name}", 
                 price = ${Number(price)}, 
                 selling = ${selling}
             where product_id = ${product_id};`;
    await Myquery(query)
    let query_return = `select * from products
                        where product_id = ${product_id};`
    let result = await Myquery(query_return)
    res.status(200).send({result})
});

export default router;