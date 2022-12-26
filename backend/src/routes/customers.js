import db from "../sql.js";
import express from 'express';
import moment from "moment";

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
        else{
            console.log('Customer query done')
            return result;
        }
    }); 
    table.map((element) => {
        element.birthday = moment(element.birthday).utc().format('YYYY-MM-DD')
    })
    return table;
};

const deleteCustomer = async(data) => {
    let id = data;
    let query = `delete from customers
                 where customer_id = ${id}`;
    await db.query(query, function(err, result) {
    if(err) throw err;
    else{
        console.log('Customer delete done')
    }
    });
}

router.delete('/', async (req, res) => {
    // console.log(req.body);
    let id = req.query
    await deleteCustomer(id);
    let result = await queryCustomer();
    res.json({ result });
});

router.get("/", async (_, res) => {
    let result = await queryCustomer();
    res.json({ result });
});
export default router;