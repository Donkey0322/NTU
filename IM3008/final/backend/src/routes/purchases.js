import db from "../sql.js";
import express from "express";
import moment from "moment";

const router = express.Router();
import { v4 } from "uuid";

const make_dict = (array_c, detail) => {
  var dic = {};
  if (detail) {
    for (var i in array_c) {
      if (Object.keys(dic).includes(String(array_c[i].purchase_id))) {
        dic[array_c[i].purchase_id].push(array_c[i]);
      } else {
        dic[array_c[i].purchase_id] = [];
        dic[array_c[i].purchase_id].push(array_c[i]);
      }
    }
  } else {
    for (var i in array_c) {
      dic[array_c[i].purchase_id] = array_c[i];
    }
  }
  console.log("Purchase query done");
  return dic;
};

function getRandomName() {
  let hexString = v4();
  console.log("hex:   ", hexString);
  hexString = hexString.replace("-", "");
  let base64String = Buffer.from(hexString, "hex").toString("base64");
  console.log("base64:", base64String);
  return base64String;
}


const make_arr = (origin, detail) => {
    var arr = [] 
    for(let i of Object.keys(origin)){
        arr.push({'origin': origin[i], 'detail': detail[i]})
    }
    return arr
}

// const addPurchase = async (data) => {
//     let {ingredient, purchase_date, price, quantity} = data;
//     let id = getRandomName()
//     query = `INSERT INTO purchases (ingredient, purchase_date, price, quantity)
//              VALUES("${ingredient}", "${purchase_date}", ${price}, ${quantity})`;
//     await db.query(query, (err, result) => {
//         if (err) throw err;
//         else {
//             console.log("Insert done");
//         }
//     });
// };


const Myquery = (query, detail) => {
    return new Promise((resolve) => {
        db.query(query,  (err, result) => {
            if (err) {
                throw err;
            }else{
                if(!detail){
                    result.map((element) => {
                        element.purchase_date = moment(element.purchase_date).utc().format('YYYY-MM-DD')
                        element.purchase_date = new Date(element.purchase_date)
                        })
                }
                resolve(result);
            }
        })
    })
}

const queryPurchase = async () => {
    let query_origin = `select purchases.purchase_id, purchases.purchase_code, purchases.purchase_date, sum(purchases_detail.price * purchases_detail.quantity) as 'total' 
                            from purchases
                            join purchases_detail on purchases.purchase_id = purchases_detail.purchase_id
                            group by purchases.purchase_id
                            order by purchases.purchase_date desc;`;
    let query_detail = `select purchases.purchase_id,purchases_detail.ingredient, purchases_detail.quantity , purchases_detail.price,  purchases_detail.price * purchases_detail.quantity as 'total' 
                            from purchases
                            join purchases_detail on purchases.purchase_id = purchases_detail.purchase_id
                            order by purchases.purchase_date desc;`;


    let array1 = await Myquery(query_origin, false)
    let origin = make_dict(array1, false)
    let array2 = await Myquery(query_detail, true)
    let detail = make_dict(array2, true)
    var arr = make_arr(origin, detail)
    return arr
};

const addPurchase = async (data, addDetail) => {
    if(addDetail){
        let {ingredient, price, quantity} = data
        let query = `select max(purchase_id) as 'purchase_id' from purchases`;
        let purchase_main = await Myquery(query);
        let purchase_id = purchase_main[0].purchase_id
        console.log(purchase_id)
        let query_add = `INSERT INTO purchases_detail (purchase_id, ingredient, price, quantity)
        VALUES(${purchase_id}, "${ingredient}", ${price}, ${quantity})`;
        await Myquery(query_add, true)
        var result = await queryPurchase()
        return result;
    }else{
        let {purchase_date} = data;
        let purchase_code = getRandomName();
        let query = `INSERT INTO purchases (purchase_code, purchase_date)
             VALUES("${purchase_code}", "${moment(purchase_date).utc().format("YYYY-MM-DD")}")`;
        await Myquery(query, true);
    }
};

router.delete("/", async (req, res) => {
  console.log(req.query);
  let {id} = req.query;
  let query = `delete from purchases
                where purchase_id = ${id}`;
  await Myquery(query, true);
  var result = await queryPurchase();
  res.status(200).send({ result });
});

router.get("/", async (_, res) => {
    var result = await queryPurchase()
    // console.log(result)
    res.status(200).send({result})
});

router.post("/", async (req, res) => {
    console.log('add')
    let data = req.body;
    console.log('add data is:', data)
    var addDetail = false
    console.log('data element:', Object.keys(data).length)
    if( Object.keys(data).length !== 4){
        addDetail = true
    }
    if(addDetail){
        var result = await addPurchase(data, addDetail);
        console.log('result is', result)
        res.status(200).send({result})
    }
    else{
        await addPurchase(data, addDetail);
        console.log('adding main purchase')
        res.status(200).send()
    } 

});
export default router;
