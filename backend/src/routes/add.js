import db from "./sql.js";

const addPurchase = async (data) => {
    let {ingredient, purchase_date, price, quantity} = data;
    query = `INSERT INTO purchases (ingredient, purchase_date, price, quantity)
             VALUES("${ingredient}", "${purchase_date}", ${price}, ${quantity})`;
    await db.query(query); 
};

const addEmployee = async (data) => {
    let {gender, employee_name, salary} = data;
    query = `INSERT INTO employees (gender, employee_name, salary)
             VALUES("${gender}", "${employee_name}", ${salary})`;
    await db.query(query); 
};

const addPromotion = async (data) => {
    let {promotion_type, start_date, end_date} = data;
    query = `INSERT INTO promotions (promotion_type, start_date, end_date)
             VALUES("${promotion_type}", "${start_date}", "${end_date}")`;
    await db.query(query); 
};

const addCustomer = async (data) => {
    let {customer_name, gender, birthday, phone_number, mail} = data;
    query = `INSERT INTO customers (customer_name, gender, birthday, phone_number, mail)
             VALUES("${customer_name}", "${gender}", "${birthday}", "${phone_number}", "${mail}")`;
    await db.query(query); 
};

const addCustomerService = async (data) => {
    let {issue_date, issue_type, detail, customer, employee} = data;
    query = `INSERT INTO customer_services (issue_date, issue_date, detail, customer, employee)
             VALUES("${issue_date}", "${issue_type}", "${detail}", ${customer}, ${employee})`;
    await db.query(query); 
};

const addOrder = async (data) => {
    let {order_date, deliver_date, deliver_method, deliver_location, customer, promotion, order_status, notes} = data;
    query = `INSERT INTO orders (order_date, deliver_date, deliver_method, deliver_location, customer, promotion, order_status, notes)
             VALUES("${order_date}", "${deliver_date}", "${deliver_method}"," ${deliver_location}", ${customer}, ${promotion}, "${order_status}", "${notes}")`;
    await db.query(query); 
};

const addOrdersDetail = async (data) => {
    let {order_id, product_id, quantity} = data;
    query = `INSERT INTO orders_detail (order_id, product_id, quantity)
             VALUES(${order_id}, ${product_id}, ${quantity})`;
    await db.query(query); 
};

const addProduct = async (data) => {
    let {product_name, price} = data;
    query = `INSERT INTO products (order_id, product_id, quantity)
             VALUES("${product_name}", ${price})`;
    await db.query(query); 
};

const addProductSetDetail = async (data) => {
    let {set_product_id, include_product_id, quantity} = data;
    query = `INSERT INTO product_set_detail (set_product_id, include_product_id, quantity)
             VALUES(${set_product_id}, ${include_product_id}, ${quantity})`;
    await db.query(query); 
};



export {addCustomer, addCustomerService, addEmployee, addOrder, addOrdersDetail, addProduct,
         addProductSetDetail, addPromotion, addPurchase};