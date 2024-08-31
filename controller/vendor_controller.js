const Vendor = require('../models/Vendor');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config()

const VendorRegister = async (req, res) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) {
            return res.status(400).json("All fields are required.")
        }

        const VendorEmail = await Vendor.findOne({ email })
        if (VendorEmail) {
            return res.status(400).json("Email Already Used...")
        }

        const hashedPwd = await bcrypt.hash(password, 11);
        const newVendor = new Vendor({ username, email, password: hashedPwd });
        await newVendor.save();
        res.status(200).json({ message: "Vendor Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server Error", details: err });
    }
};

const VendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json("Email and password are required.")
        }

        const VendorData = await Vendor.findOne({ email });
        if (!VendorData || !(await bcrypt.compare(password, VendorData.password))) {
            return res.status(404).json({ Message: "Invalid User or Password" })
        }

        const vendorId = VendorData._id;
        const token = jwt.sign({ VendorId: vendorId }, process.env.SECRET_KEY, { expiresIn: "2h" });
        res.status(200).json({ Message: "Login Successfully", token, vendorId })
    } catch (err) {
        res.status(500).json({ error: "Login Failed...", details: err });
    }
};

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm')
        res.status(200).json({ vendors });
    } catch (err) {
        res.status(500).json({ Message: "Server Error", details: err })
    }
};

const getSingleVendor = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ Message: "Vendor ID is required" })
    }

    try {
        const Singlevendor = await Vendor.findById(id).populate('firm')
        if (!Singlevendor) {
            return res.status(404).json("Vendor Not Found")
        }

        let vendorFirmId = null;
        if (Singlevendor.firm && Singlevendor.firm.length > 0) {
            vendorFirmId = Singlevendor.firm[0]._id;
        }
        res.status(200).json({ Singlevendor, vendorFirmId })
    } catch (err) {
        res.status(500).json({ Message: "Server Error", details: err })
    }
};

module.exports = { VendorRegister, VendorLogin, getAllVendors, getSingleVendor }
