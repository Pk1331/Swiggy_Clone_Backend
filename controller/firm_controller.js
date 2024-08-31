const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Files are stored in the 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { Restaurant_Name, Area, Category, Region, Offer } = req.body;
        const Restaurant_image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.VendorId);
        if (!vendor) return res.status(401).json({ Message: "Vendor Not found" });
        if(vendor.firm.length>0)
        {
            return res.status(401).json({"Message":"One Vendor One Firm"})
        }
        const firm = new Firm({ Restaurant_Name, Area, Category:Category.split(','), Region: Region.split(','), Offer, Restaurant_image, vendor: vendor._id });
        const savedFirm = await firm.save();
        const firmId=savedFirm._id
        vendor.firm.push(firmId);
        await vendor.save();

        res.status(200).json({ Message: "Firm Added Successfully",firmId });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Message: "Internal Server Error" });
    }
};

const deleteFirmById = async (req, res) => {
    try {
        const firmid = req.params.firmid;
        const deletedFirm = await Firm.findByIdAndDelete(firmid);
        if (!deletedFirm) return res.status(404).json("Firm Not Found..");
        res.status(200).json("Firm Deleted Successfully..");
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
};

module.exports = { addFirm: [upload.single('Restaurant_image'), addFirm], deleteFirmById };
