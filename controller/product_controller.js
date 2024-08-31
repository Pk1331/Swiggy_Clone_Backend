const Product=require('../models/Product')
const Firm=require('../models/Firm')
const multer=require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });
const addproduct=async(req,res)=>
{
    try
    {
        const{productName,price,category,bestseller,description}=req.body
        const productImage=req.file ? req.file.filename : undefined
        const firm =await Firm.findById(req.params.id)
        if(!firm)
            return res.status(404).json({Message:"Firm Not Found"})
        const newproduct=new Product({productName,price,category:category.split(','),bestseller,description,productImage,firm:firm._id})
        const savedProduct=await newproduct.save()
        firm.products.push(savedProduct)
        await firm.save()
        res.status(200).json(savedProduct)
    }
    catch(err)
    {
      console.log(err)
      res.status(500).json({err:"Internal Server error"})
    }
    
}

const getProduct=async(req,res)=>
{
    try
    {
        const firmId=req.params.id
        const firm=await Firm.findById(firmId)  
        if(!firm)
            return res.status(404).json("Firm Not Found")
        const Restaurant_Name=firm.Restaurant_Name
        const products=await Product.find({firm:firmId})
        res.status(200).json({Restaurant_Name,products}) 
    }
    catch(err)
    {
        res.status(500).json("Internal Server Error"+err)
    }
}

const deleteProductById=async(req,res)=>
{
    
    try
    {
      const productId=req.params.productId
      const deletedProduct=await Product.findByIdAndDelete(productId)
      if(!deletedProduct)
        return res.status(401).json("Product Not Found..")
      res.status(200).json("Product Deleted Successfully..")

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json("Server Error")
    }
    
}

module.exports={addproduct:[upload.single('productImage'),addproduct],getProduct,deleteProductById}