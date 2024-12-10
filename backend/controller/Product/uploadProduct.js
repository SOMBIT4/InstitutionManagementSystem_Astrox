const uploadproductpermission = require("../../helpers/permission")
const courseModel = require("../../models/courses")


async function UploadProductController(req,res){
    try{

        const sessionUserId = req.userId
        if(!uploadproductpermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const UploadProduct = new courseModel(req.body)
        const saveProduct  = await UploadProduct.save()

        res.status(201).json({
            message : "Course uploaded successfully",
            data : saveProduct,
            error : false,
            success : true,
        })
        
    }
    catch(err){

        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = UploadProductController