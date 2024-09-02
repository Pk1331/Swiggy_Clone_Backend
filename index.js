const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const body_parser=require('body-parser')
const Vendor_Routes=require('./Routes/Vendor_Routes')
const Firm_Routes=require('./Routes/Firm_Routes')
const Product_Routes=require('./Routes/Product_Routes')
const path=require('path')
const app=express()
const cors = require('cors')
dotenv.config()
const PORT=process.env.PORT || 5000
app.use(cors({
    origin: 'https://swiggy-clone-dashboard-hi14vhhr2-pavan-kumars-projects-16b37752.vercel.app/',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  }));

app.use(body_parser.json())
app.use('/vendor',Vendor_Routes)
app.use('/firm',Firm_Routes)
app.use('/product',Product_Routes)
app.use('/uploads',express.static('uploads'))

mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log("Connection Successfull..."))
.catch((err)=>console.log(err))
app.listen(PORT,()=>console.log("http://localhost:5000/"))