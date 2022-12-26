import db from "../sql.js";
import express from 'express';

// router.post('/', async (req, res) => {
//     console.log(req.body);
//     var add = await addCustomer(req.body);
//     res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
// });

const router = express.Router();
const queryProduct = async () => {
    let query = `select * from products;`;
    let table = await db.query(query, function(err, result) {
        if(err) throw err;
        else{
            console.log('Product query return.')
            return result;
        }
    }); 
    return table;
};

const deleteProduct = async(data) => {
    let id = data;
    let query = `delete from products
                 where product_id = ${id}`;
    await db.query(query, function(err, result) {
    if(err) throw err;
    else{
        console.log('Product delete done')
    }
    });
}

const addProduct = async (data) => {
    let {product_name, price, photo} = data;
    query = `INSERT INTO products (product_name, price, photo)
             VALUES("${product_name}", "${price}", ${photo})`;
    await db.query(query, (err, result) => {
        if (err) throw err;
        else {
            console.log("Product insert done");
        }
    })
    query_return = `select * from products
                    order by product_id desc
                    limit 1;`
    let new_product = await db.query(query_return, (err, result) => {
                            if (err) throw err;
                            else {
                                console.log("Product new add return");
                                return result
                            }
                        })
    return new_product;
};

router.delete('/', async (req, res) => {
    // console.log(req.body);
    let id = req.query
    await deleteProduct(id);
    let result = await queryProduct();
    res.json({result});
});

router.get("/", async (_, res) => {
    let result = await queryProduct();
    res.json({ result });
});

router.post('/', async (req, res) => {
    console.log('Product to add:', req.body);
    var result = await addProduct(req.body);
    res.json({ result });
});
export default router;