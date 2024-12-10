const courseModel = require("../../models/courses")
const productModel = require("../../models/productModel")


const getProductDetails = async(req,res)=>{
    try{
        const { productId } = req.body

        const product = await courseModel.findById(productId)

        res.json({
            data : product,
            message : "OK",
            succes  : true,
            error : false
        })
        
    }catch(err){
        res.json({
            message : err?.message || err,
            error :true,
            success :false
        })
    }
}
module.exports = getProductDetails