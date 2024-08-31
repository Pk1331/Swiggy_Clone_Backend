const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    if (!token) return res.status(401).json({ error: "Token is Required..." });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const vendor = await Vendor.findById(decoded.VendorId);
        if (!vendor) return res.status(401).json({ error: "Invalid Vendor or vendor not found" });
        req.VendorId = vendor._id;  
        next();
    } catch (err) {
        res.status(500).json({ error: "Invalid Token" });
    }
};

module.exports = verifyToken;
