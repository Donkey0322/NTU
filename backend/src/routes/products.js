import db from "../sql.js";
import express from 'express';


const router = express.Router();

const Myquery = (query, detail) => {
    return new Promise((resolve) => {
        db.query(query,  (err, result) => {
            if (err) {
                throw err;
            }else{
                if(detail) resolve(result);
            }
        })
    })
}

router.delete('/', async (req, res) => {
    let {id} = req.query;
    console.log(id)
    let query = `delete from products
                 where product_id = ${id}`;
    await Myquery(query, false)
    let return_query = `select * from products;`;
    var result = await Myquery(return_query, true)
    res.status(200).send({result})
});

router.get("/", async (_, res) => {
    let query = `select * from products
                 where selling = 1;`;
    var result = await Myquery(query, true)
    res.status(200).send({result})
});

router.post('/', async (req, res) => {
    console.log('Product to add:', req.body);
    let {product_name, price, photo} = req.body;
    let query = `INSERT INTO products (product_name, price, photo)
             VALUES("${product_name}", ${price}, "${photo}")`;
    await Myquery(query, false)
    let query_return = `select * from products
                    order by product_id desc
                    limit 1;`
    let result = await Myquery(query_return, true)
    res.status(200).send({result})
});

router.put('/', async (req, res) => {
    console.log('Product to update:', req.body);
    let {product_id, product_name, price, photo} = req.body;
    let query = `update products set
                 product_name = "${product_name}", 
                 price = ${price}, 
                 photo = "${photo}"
             where product_id = ${product_id}`;
    await Myquery(query, false)
    let query_return = `select * from products
                        where product_id = ${product_id};`
    let result = await Myquery(query_return, true)
    res.status(200).send({result})
});

export default router;