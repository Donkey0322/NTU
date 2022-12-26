import db from "./sql.js";
import express from 'express';


const router = express.Router();
import { v4 } from 'uuid';

function getRandomName() {

    let hexString = v4();
    console.log("hex:   ", hexString);
    
    // remove decoration
    hexString = hexString.replace(/-/g, "");
    
    let base64String = Buffer.from(hexString, 'hex').toString('base64')
    console.log("base64:", base64String);
    
    return base64String;
}


const addPurchase = async (data) => {
    let {ingredient, purchase_date, price, quantity} = data;
    query = `INSERT INTO purchases (ingredient, purchase_date, price, quantity)
             VALUES("${ingredient}", "${purchase_date}", ${price}, ${quantity})`;
    await db.query(query, (err, result) => {
        if (err) throw err;
        else {
            console.log("Insert done");
        }
    }); 
};

const queryPurchase = async () => {
    query = `SELECT * FROM purchases`;
    await db.query(query, function(err, rows) {
        if(err) throw err;
        console.log(rows)
        return rows;
    }); 
};

router.post('/', async (req, res) => {
    console.log(req.body);
    await addPurchase(req.body);
    res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
});

router.get("/", async (_, res) => {
    db.query("SELECT * FROM purchases", (err, result) => {
        if (err) throw err;
        else {
        console.log("Query done");
        res.json({ result });
        }
    });
});