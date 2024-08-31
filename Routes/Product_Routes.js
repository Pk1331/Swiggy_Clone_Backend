const express=require('express')
const ProductController=require('../controller/product_controller')
const router=express.Router()
const path=require('path')

router.post('/add-product/:id',ProductController.addproduct)
router.get('/:id/get-products/',ProductController.getProduct)

router.get('/uploads/:imageName',(req,res)=>
    {
        const imageName=req.params.imageName
        res.headersSent('Content-Type','image/jpeg')
        res.sendFile(path.join(__dirname,'..','uploads',imageName))
    })
    
router.delete('/delete-product/:productId',ProductController.deleteProductById)
module.exports=router