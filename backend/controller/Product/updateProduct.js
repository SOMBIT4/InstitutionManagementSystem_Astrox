const uploadproductpermission = require("../../helpers/permission")
const courseModel = require("../../models/courses")


async function updateProductController(req,res){
    try{
        if(!uploadproductpermission(req.userId)){
            throw new Error("Permission denied")
        }

        const {_id, ...resBody}=req.body 
        const updateProduct = await courseModel.findByIdAndUpdate(_id,resBody)
        console.log("Product ",updateProduct)
        res.json({
            message : "Product updated successfully",
            data : updateProduct,
            success : true,
            error : false
        })
        const productId = req?._id
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}
module.exports = updateProductController