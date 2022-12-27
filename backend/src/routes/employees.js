import db from "../sql.js";
import express from 'express';


const router = express.Router();

const Myquery = (query) => {
    // console.log(query)
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
    let {id} = req.query;
    console.log(id)
    let query = `delete from employees
                 where employee_id = ${id}`;
    await Myquery(query, false)
    let return_query = `select * from employees
                        order by working desc;`;
    var result = await Myquery(return_query)
    res.status(200).send({result})
});

router.get("/", async (_, res) => {
    let query = `select * from employees
                 order by working desc;`;
    var result = await Myquery(query)
    res.status(200).send({result})
});

router.post('/', async (req, res) => {
    console.log('Employee to add:', req.body);
    let {gender, employee_name, salary, working} = req.body;
    let query = `INSERT INTO employees (gender, employee_name, salary, working)
             VALUES("${gender}", "${employee_name}", ${salary}, ${working})`;
    await Myquery(query)
    let query_return = `select * from employees
                    order by employee_id desc
                    limit 1;`
    let result = await Myquery(query_return)
    res.status(200).send({result})
});

router.put('/', async (req, res) => {
    console.log('Employee to update:', req.body.value);
    let {employee_id, gender, employee_name, salary, working} = req.body.value
    let query = `update employees set
                 gender = "${gender}", 
                 employee_name = "${employee_name}", 
                 salary = ${salary},
                 working = ${working}
             where employee_id = ${employee_id}`;
    await Myquery(query);
    let query_return = `select * from employees
                        where employee_id = ${employee_id};`;
    var result = await Myquery(query_return);
    // console.log(result)
    res.status(200).send({result})
});
export default router;