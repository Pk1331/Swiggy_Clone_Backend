const Vendor_Controller=require('../controller/vendor_controller')
const express=require('express')
const router=express.Router();

router.post('/register',Vendor_Controller.VendorRegister)
router.post('/login',Vendor_Controller.VendorLogin)
router.get('/all-vendors',Vendor_Controller.getAllVendors)
router.get('/:id',Vendor_Controller.getSingleVendor)

module.exports=router