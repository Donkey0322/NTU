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
    let id = req.query;
    let query = `delete from products
                 where product_id = ${id}`;
    await Myquery(query)
    let return_query = `select * from products;`;
    var result = await Myquery(return_query)
    res.status(200).send({result})
});

router.get("/", async (_, res) => {
    let query = `select * from products;`;
    var result = await Myquery(query)
    res.status(200).send({result})
});

router.post('/', async (req, res) => {
    console.log('Product to add:', req.body);
    let {product_name, price, photo} = req.body;
    let query = `INSERT INTO products (product_name, price, photo)
             VALUES("${product_name}", "${price}", ${photo})`;
    await Myquery(query)
    let query_return = `select * from products
                    order by product_id desc
                    limit 1;`
    let result = await Myquery(query_return)
    res.status(200).send({result})
});
export default router;