import db from "../sql.js";
import express from "express";
import moment from "moment";

const router = express.Router();

const Myquery = (query, detail) => {

    return new Promise((resolve) => {
        db.query(query,  (err, result) => {
            if (err) {
                throw err;
            }else{
                if(detail){
                    result.map((element) => {
                        element.issue_date = moment(element.issue_date).utc().format('YYYY-MM-DD')
                        element.issue_date = new Date(element.issue_date)
                    })
                    resolve(result);
                }
            }
        })
    })
}

router.delete('/', async (req, res) => {
    // console.log(req.body);
    let {id} = req.query
    let query = `delete from customer_services
    where issue_id = ${id}`;
  await Myquery(query, false);
  let return_query = `select customer_services.issue_id, customer_services.details, customer_services.issue_type,
                        customer_services.issue_date, customers.customer_name, employees.employee_name from customer_services
                            join customers on customers.customer_id = customer_services.customer
                            join employees on employees.employee_id = customer_services.employee
                        order by customer_services.issue_date desc;`;
  var result = await Myquery(return_query, true);
  res.status(200).send({ result });
});

router.get("/", async (_, res) => {
  let query = `select customer_services.issue_id, customer_services.details, customer_services.issue_type,
	             customer_services.issue_date, customers.customer_name, employees.employee_name from customer_services
                        join customers on customers.customer_id = customer_services.customer
                        join employees on employees.employee_id = customer_services.employee
                 order by customer_services.issue_date desc;`;
  var result = await Myquery(query, true);
  res.status(200).send({ result });
});

export default router;
