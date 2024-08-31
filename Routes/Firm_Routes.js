const express=require('express')
const FirmController=require('../controller/firm_controller')
const router=express.Router()
const verifyToken=require('../middlewares/VerifyToken')
const path=require('path')

router.post('/add-firm',verifyToken,FirmController.addFirm)

router.get('/uploads/:imageName',(req,res)=>
{
    const imageName=req.params.imageName
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})

router.delete('/delete-firm/:firmid',FirmController.deleteFirmById)
module.exports=router