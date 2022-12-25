import express from 'express'
import {addCustomer, addCustomerService, addEmployee, addOrder, addOrdersDetail, addProduct,
        addProductSetDetail, addPromotion, addPurchase }from './scoreCard';
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

router.post('/addPurchase', async (req, res) => {
    console.log(req.body);
    var add = await addPurchase(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.post('/addPromotion', async (req, res) => {
    console.log(req.body);
    var add = await addPromotion(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.post('/addEmployee', async (req, res) => {
    console.log(req.body);
    var add = await addEmployee(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.post('/addCustomer', async (req, res) => {
    console.log(req.body);
    var add = await addCustomer(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});
export default router;