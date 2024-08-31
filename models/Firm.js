const mongoose = require('mongoose')

const firmSchema= new mongoose.Schema({
    Restaurant_Name:{
        type:String,
        required:true,

    },
    Area:{
        type:String,
        required:true
    },
    Category:{
        type:[
            {
                type:String,
                enum:["Veg","Non-Veg"]
            }
        ],
        required:true
    },
    Region:{
        type:[
            {
                type:String,
                enum:["South-Indian","North-Indian","Chinese","Bakery"]
            }
        ],
        required:true
    },
    offer:{
        type:String,
    },
    Restaurant_image:{
        type:String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vendor"
        }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
})

module.exports=mongoose.model("Firm",firmSchema)