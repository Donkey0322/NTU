import db from "../sql.js";
import express from 'express';
import moment from "moment";

const router = express.Router();
import { v4 } from 'uuid';

const make_dict = (array_c, detail) => {
    var dic = {}
    if(detail){
        for(var i in array_c){
            if(Object.keys(detail).includes(String(array_c[i].purchase_id))){
                dic[array_c[i].purchase_id].push(array_c[i])
            }else{
                dic[array_c[i].purchase_id] = []
                dic[array_c[i].purchase_id].push(array_c[i])
            }
        }
    }
    else{
        for(var i in array_c){
            dic[array_c[i].purchase_id] = array_c[i]
        }
    }
    console.log('Purchase query done')
    return dic
}

function getRandomName() {
    let hexString = v4();
    console.log("hex:   ", hexString);
    hexString = hexString.replace(/-/g, "");
    let base64String = Buffer.from(hexString, 'hex').toString('base64')
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

const Myquery = (query, detail, remove) => {
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
                if(!remove){
                    resolve(result);
                }
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

    let array1 = await Myquery(query_origin, false, false)
    let origin = make_dict(array1, false, false)
    let array2 = await Myquery(query_detail, true, false)
    let detail = make_dict(array2, true)
    var arr = make_arr(origin, detail)
    return arr
};

// router.post('/', async (req, res) => {
//     console.log(req.body);
//     await addPurchase(req.body);
//     res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
// });


router.delete('/', async (req, res) => {
    // console.log(req.body);
    let id = req.query
    let query = `delete from purchases
                 where purchase_id = ${id}`;
    await Myquery(query, true);
    var result = await queryPurchase();
    res.status(200).send({result});
});


router.get("/", async (_, res) => {
    var result = await queryPurchase()
    console.log(result)
    res.status(200).send({result})

});
export default router;