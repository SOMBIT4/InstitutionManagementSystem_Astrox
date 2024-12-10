const courseModel = require("../../models/courses")
const productModel = require("../../models/productModel")
const getProductController = async(req,res)=>{
    try{
        const allProduct = await courseModel.find().sort({createdAt : -1})
        res.json({
            message : "All product",
            data : allProduct,
            success : true,
            error : false
        
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = getProductController