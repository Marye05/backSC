// const mercadopago=require('mercadopago')
// require('dotenv').config();
// const {TOKEN_MP } = process.env;

// const createOrder=async(req,res)=>{
//     const data=req.body
//     const product=data.cardPey
//     const user=data.idUser

//     try{
//         mercadopago.configure({
//             access_token: TOKEN_MP
//         });

//         const itemsProduct = product?.length>0 ? product.map(element => ({
//             title: element.name,
//             unit_price: parseInt(element.retail_price_cents.toString().slice(0, -2)),
//             currency_id: 'ARS',
//             quantity: 1,
//             description: element.brand_name,
//             picture_url: element.main_picture_url,
//             id: element.id,
//             category_id: element.category[0],
//             condition: element.size
//         })): [];

//         const userPayer=user.id

//         const result= await mercadopago.preferences.create({
//             items: itemsProduct,
//             payer: userPayer,
//             installments: 1,
//             backs_urls:{
//                 success: 'http://localhost:3001/payment/success',
//                 failure: 'http://localhost:3001/payment/failure',
//                 pending: 'http://localhost:3001/payment/pending',
//             },
//             notification_url: 'https://1b49-2803-9800-9001-c29f-38e0-d923-61ec-174.ngrok-free.app/payment/webhook'
//         })
//         console.log('items+++++++++',items)
//         console.log('payer++++++', payer)
//         res.send(result.body)

//     }catch(error){
//         return {error: error.message}
//     }
// }

// module.exports={createOrder}










const mercadopago=require('mercadopago')
require('dotenv').config();
const {TOKEN_MP } = process.env;

const createOrder=async(req,res)=>{
    const data=req.body
    const product=data.cardPey
    const user=data.idUser

    try{
        mercadopago.configure({
            access_token: TOKEN_MP
        });

        const itemsProduct = product?.length>0 ? product.map(element => ({
            title: element.name,
            unit_price: parseInt(element.retail_price_cents.toString().slice(0, -2)),
            currency_id: 'ARS',
            quantity: 1,
            description: element.brand_name,
            id: element.id,
            category_id: element.size
        })): [];

        //<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>


        const result= await mercadopago.preferences.create({
            items: itemsProduct,
            external_reference: user.id, // el id del user para asociarlo
            installments: 1,
            backs_urls:{
                success: 'http://localhost:3001/payment/success',
                failure: 'http://localhost:3001/payment/failure',
                pending: 'http://localhost:3001/payment/pending',
            },
            notification_url: 'https://1ec5-2803-9800-9001-c29f-1d7b-f98f-9dd5-3320.ngrok-free.app/payment/webhook'
        });
    
        res.send(result.body)

    }catch(error){
        return {error: error.message}
    }
}

module.exports={createOrder}