import db from "../sql.js";
import express from 'express';


const router = express.Router();
import { v4 } from 'uuid';

const make_dict = (array_c, detail) => {
    var dic = {}
    if(detail){
        for(var i in array_c){
            if(Object.keys(detail).includes(String(array_c[i].order_id))){
                dic[array_c[i].order_id].push(array_c[i])
            }else{
                dic[array_c[i].order_id] = []
                dic[array_c[i].order_id].push(array_c[i])
            }
        }
    }
    else{
        for(var i in array_c){
            dic[array_c[i].order_id] = array_c[i]
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


    let array1 = await db.query(query_origin, function(err, result) {
        if(err) throw err;
        return result;
    }); 

    array1.map((element) => {
        element.purchase_date = moment(element.purchase_date).utc().format('YYYY-MM-DD')
    })

    let origin = make_dict(array_c = array1, detail = false)

    let array2 = await db.query(query_detail, function(err, result) {
        if(err) throw err;
        return result;
    }); 

    let detail = make_dict(array_c = array2, detail = true)
    var dict = {origin, detail}
    return dict
};

// router.post('/', async (req, res) => {
//     console.log(req.body);
//     await addPurchase(req.body);
//     res.json({ message: `${add} (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
// });

router.delete('/', async (req, res) => {
    // console.log(req.body);
    let id = req.query
    await deletePurchase(id);
    let result = await queryPurchase();
    res.json({ result });
});

router.get("/", async (_, res) => {
    let result = await queryPurchase();
    res.json({ result });
});
export default router;