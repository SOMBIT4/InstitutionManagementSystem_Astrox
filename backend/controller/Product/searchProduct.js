const courseModel = require("../../models/courses")
const productModel = require("../../models/productModel")

const searchProduct = async(req,res)=>{
    try{
        const query = req.query.q
        const regex = new RegExp(query,'i','g')

        const product = await courseModel.find({
            "$or":[
            {
                productName : regex
            },
            {
                category:regex
            }
        ]
        })

        res.json({
            data : product,
            message : "Search Product list",
            error: false,
            success: true
        })
    }catch(err){
        res.json(
            {
                
                error:true,
                success: false,
                message: err.message || err
            }
        )
    }
}

module.exports = searchProduct