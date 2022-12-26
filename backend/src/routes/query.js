import db from "./sql.js";

const queryPurchase = async () => {
    query = `SELECT * FROM purchases`;
    await db.query(query, function(err, rows) {
        if(err) throw err;
        console.log(rows)
        return rows;
    }); 
};

const queryAll = async () => {
    query = `SELECT * FROM purchases`;
    await db.query(query, function(err, rows) {
        if(err) throw err;
        console.log(rows)
        return rows;
    }); 
};
