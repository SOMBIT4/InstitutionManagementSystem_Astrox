const mongoose  = require('mongoose')
const courseSchema = new mongoose.Schema({
    
    productName: String,
    //brandName: String,
    category: String,
    productImage: [],
    description: String,
    //price: String,
    sellingPrice: Number
},{
    timestamps : true
})

const courseModel = mongoose.model("courses",courseSchema)

module.exports = courseModel
