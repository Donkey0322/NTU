import db from "./sql.js";
import express from 'express';

// router.post('/', async (req, res) => {
//     console.log(req.body);
//     var add = await addCustomer(req.body);
//     res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
// });

const router = express.Router();
const queryEmployee = async () => {
    let query = `select * from employees;`;
    let table = await db.query(query, function(err, result) {
        if(err) throw err;
        else{
            console.log('Employee query return.')
            return result;
        }
    }); 
    return table;
};

const deleteEmployee = async(data) => {
    let id = data;
    let query = `delete from customers
                 where order_id = ${id}`;
    await db.query(query, function(err, result) {
    if(err) throw err;
    else{
        console.log('Employee delete done')
    }
    });
}

const addEmployee = async (data) => {
    let {gender, employee_name, salary} = data;
    query = `INSERT INTO employees (gender, employee_name, salary)
             VALUES("${gender}", "${employee_name}", ${salary})`;
    await db.query(query, (err, result) => {
        if (err) throw err;
        else {
            console.log("Employee insert done");
        }
    })
    query_return = `select * from employees
                    order by employee_id desc
                    limit 1;`
    let new_employee = await db.query(query_return, (err, result) => {
                            if (err) throw err;
                            else {
                                console.log("Employee new add return");
                                return result
                            }
                        })
    return new_employee;
};

router.delete('/', async (req, res) => {
    // console.log(req.body);
    let id = req.query
    await deleteEmployee(id);
    let result = await queryEmployee();
    res.json({result});
});

router.get("/", async (_, res) => {
    let result = await queryEmployee();
    res.json({ result });
});

router.post('/', async (req, res) => {
    console.log('Employee to delete:', req.body);
    var result = await addEmployee(req.body);
    res.json({ result });
});