const {Car, User, Product}=require('../../db')

const createCardHandlers=async({productId, iD_User, name, main_picture_url, retail_price_cents, size, quantity})=>{
    console.log('handler****car', productId, iD_User, name, main_picture_url, retail_price_cents, size, quantity)
    try{

        const findProduct= await Product.findByPk(productId);
        console.log('findProduct++++++++',findProduct)

        const findUser= await User.findOne({
            where: { id: iD_User },
        });
        console.log('finduser++++++++',findUser)

        if (findUser && findProduct){
            const createProduct= await Car.create( {

                productId: findProduct.id, userId: findUser.id , name, main_picture_url, retail_price_cents, size, quantity
            })
            if (createProduct){
                return createProduct;
            }else{
                return {error: 'Product not saved'}
            }

        }else{
            return {error: 'User not found'}
        }

    }catch(error){

        return { error: error.message };
    }
}

module.exports={createCardHandlers}