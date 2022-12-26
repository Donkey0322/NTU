import db from "../sql.js";
import express from 'express';
import moment from "moment";

const router = express.Router();
const queryService = async () => {
    let query = `select customer_services.issue_id, customer_services.details, customer_services.issue_type,
	             customer_services.issue_date, customers.customer_name, employees.employee_name from customer_services
                        join customers on customers.customer_id = customer_services.customer
                        join employees on employees.employee_id = customer_services.employee
                 order by customer_services.issue_date desc;`;
    let table = await db.query(query, function(err, result) {
        if(err) throw err;
        else{
            console.log('Customer_services query return.')
            return result;
        }
    }); 
    table.map((element) => {
        element.issue_date = moment(element.issue_date).utc().format('YYYY-MM-DD')
    })
    return table;
};

const deleteService = async(data) => {
    let id = data;
    let query = `delete from customer_services
                 where issue_id = ${id}`;
    await db.query(query, function(err, result) {
    if(err) throw err;
    else{
        console.log('Customer_services delete done')
    }
    });
}

// const addEmployee = async (data) => {
//     let {gender, employee_name, salary} = data;
//     query = `INSERT INTO employees (gender, employee_name, salary)
//              VALUES("${gender}", "${employee_name}", ${salary})`;
//     await db.query(query, (err, result) => {
//         if (err) throw err;
//         else {
//             console.log("Employee insert done");
//         }
//     })
//     query_return = `select * from employees
//                     order by employee_id desc
//                     limit 1;`
//     let new_employee = await db.query(query_return, (err, result) => {
//                             if (err) throw err;
//                             else {
//                                 console.log("Employee new add return");
//                                 return result
//                             }
//                         })
//     return new_employee;
// };

router.delete('/', async (req, res) => {
    // console.log(req.body);
    let id = req.query
    await deleteService(id);
    let result = await queryService();
    res.json({ result });
});

router.get("/", async (_, res) => {
    let result = await queryService();
    res.json({ result });
});

// router.post('/', async (req, res) => {
//     console.log('Employee to add:', req.body);
//     var result = await addEmployee(req.body);
//     res.json({ result });
// });
export default router;