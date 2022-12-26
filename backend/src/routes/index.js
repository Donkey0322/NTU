import express from 'express';
import sql from "./sql.js";
import {addCustomer, addCustomerService, addEmployee, addOrder, addOrdersDetail, addProduct,
        addProductSetDetail, addPromotion, addPurchase }from './add';
const router = express.Router();

router.delete('/cards', async (_, res) => {
    await deleteDB();
    res.json({ message: 'Database cleared' })
});

router.get('/cards', async (req, res) => {
    const type = req.query.type;
    const content = req.query.queryString;
    var query = await queryScoreCard(type, content);
    var result = [];
    for(var i = 0; i < query.length; i++){
        result.push(`Found card with ${type}: (${query[i].Name}, ${query[i].Subject}, ${query[i].Score})`);
    }
    if(result.length > 0){
        res.json({ messages: result, message: true});
    }
    else{
        res.json({ message: `${type} (${content}) not found!`});
    }
});

router.post('/purchases', async (req, res) => {
    console.log(req.body);
    var add = await addPurchase(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.post('/promotions', async (req, res) => {
    console.log(req.body);
    var add = await addPromotion(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.post('/employees', async (req, res) => {
    console.log(req.body);
    var add = await addEmployee(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.post('/customers', async (req, res) => {
    console.log(req.body);
    var add = await addCustomer(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.post('/customer_services', async (req, res) => {
    console.log(req.body);
    var add = await addCustomer(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.get("/purchases", async (_, res) => {
    sql.query("SELECT * FROM purchases", (err, result) => {
        if (err) throw err;
        else {
        console.log("Query done");
        res.json({ result });
        }
    });
});

router.get("/promotions", async (_, res) => {
    sql.query("SELECT * FROM promotions", (err, result) => {
        if (err) throw err;
        else {
        console.log("Query done");
        res.json({ result });
        }
    });
});

router.get("/employees", async (_, res) => {
    sql.query("SELECT * FROM employees", (err, result) => {
        if (err) throw err;
        else {
        console.log("Query done");
        res.json({ result });
        }
    });
});

router.get("/customers", async (_, res) => {
    sql.query("SELECT * FROM customers", (err, result) => {
        if (err) throw err;
        else {
        console.log("Query done");
        res.json({ result });
        }
    });
});

router.get("/purchases", async (_, res) => {
    sql.query("SELECT * FROM purchases", (err, result) => {
        if (err) throw err;
        else {
        console.log("Query done");
        res.json({ result });
        }
    });
});

router.get("/orders", async (_, res) => {
    sql.query("SELECT * FROM orders", (err, result) => {
        if (err) throw err;
        else {
        console.log("Query done");
        res.json({ result });
        }
    });
});


export default router;