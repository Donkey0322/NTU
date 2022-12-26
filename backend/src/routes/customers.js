import db from "./sql.js";
import express from 'express';

// router.post('/', async (req, res) => {
//     console.log(req.body);
//     var add = await addCustomer(req.body);
//     res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
// });

const router = express.Router();
const queryCustomer = async () => {
    let query = `select * from customers
                        order by customer_id desc;`;

    let table = await db.query(query, function(err, result) {
        if(err) throw err;
        return result;
    }); 
    return table;
};

const deleteCustomer = async(data) => {
    let id = data;
    let query = `delete from customers
                 where order_id = ${id}`;
    await db.query(query, function(err, result) {
    if(err) throw err;
    return result;
    });
}

router.delete('/', async (req, res) => {
    // console.log(req.body);
    let id = req.query
    await deleteCustomer(id);
    let result = await queryCustomer();
    res.json({ customers: result});
});

router.get("/", async (_, res) => {
    let result = await queryCustomer();
    res.json({ customers: result});
});