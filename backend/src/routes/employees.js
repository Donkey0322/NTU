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
    let id = req.query;
    let query = `delete from employees
                 where employee_id = ${id}`;
    await Myquery(query, false)
    let return_query = `select * from employees;`;
    var result = await Myquery(return_query, true)
    res.status(200).send({result})
});

router.get("/", async (_, res) => {
    let query = `select * from employees;`;
    var result = await Myquery(query, true)
    res.status(200).send({result})
});

router.post('/', async (req, res) => {
    console.log('Employee to add:', req.body);
    let {gender, employee_name, salary} = req.body;
    let query = `INSERT INTO employees (gender, employee_name, salary)
             VALUES("${gender}", "${employee_name}", ${salary})`;
    await Myquery(query, false)
    let query_return = `select * from employees
                    order by employee_id desc
                    limit 1;`
    let result = await Myquery(query_return, true)
    res.status(200).send({result})
});

router.put('/', async (req, res) => {
    console.log('Employee to update:', req.body);
    let {employee_id, gender, employee_name, salary} = req.body;
    let query = `update employees set
                 gender = "${gender}", 
                 employee_name = "${employee_name}", 
                 salary = ${salary}
             where employee_id = ${employee_id}`;
    await Myquery(query, false)
    let query_return = `select * from employees
                        where employee_id = ${employee_id};`
    let result = await Myquery(query_return, true)
    res.status(200).send({result})
});
export default router;