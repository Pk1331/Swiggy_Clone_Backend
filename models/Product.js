const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["Veg","Non-Veg"]
            }
        ]
    },
    productImage:{
        type:String,
    },
    bestseller:{
        type:String,
        required:true

    },
    description:{
        type:String,
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
})

module.exports=mongoose.model("Product",productSchema)