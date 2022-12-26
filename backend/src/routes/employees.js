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
    let query = `delete from employees
                 where employee_id = ${id}`;
    await Myquery(query)
    let return_query = `select * from employees;`;
    var result = await Myquery(return_query)
    res.status(200).send({result})
});

router.get("/", async (_, res) => {
    let query = `select * from employees;`;
    var result = await Myquery(query)
    res.status(200).send({result})
});

router.post('/', async (req, res) => {
    console.log('Employee to add:', req.body);
    let {gender, employee_name, salary} = req.body;
    let query = `INSERT INTO employees (gender, employee_name, salary)
             VALUES("${gender}", "${employee_name}", ${salary})`;
    await Myquery(query)
    let query_return = `select * from employees
                    order by employee_id desc
                    limit 1;`
    let result = await Myquery(query_return)
    res.status(200).send({result})
});
export default router;