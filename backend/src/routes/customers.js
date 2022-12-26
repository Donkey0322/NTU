import db from "../sql.js";
import express from 'express';
import moment from "moment";


const router = express.Router();
const Myquery = (query) => {
    return new Promise((resolve) => {
        db.query(query,  (err, result) => {
            if (err) {
                throw err;
            }else{
                result.map((element) => {
                    element.birthday = moment(element.birthday).utc().format('YYYY-MM-DD')
                    element.birthday = new Date(element.birthday)
                })
                resolve(result);
            }
        })
    })
}

router.delete('/', async (req, res) => {
    // console.log(req.body);
    let id = req.query
    let query = `delete from customers
                 where customer_id = ${id}`;
    await Myquery(query)
    let return_query = `select * from customers;`;
    var result = await Myquery(return_query)
    res.status(200).send({result})
});

router.get("/", async (_, res) => {
    let query = `select * from customers
    order by customer_id desc;`;
    var result = await Myquery(query)
    res.status(200).send({result})
    
    // res.json({ result });
});
export default router;