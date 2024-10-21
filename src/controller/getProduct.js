const Product = require("../modules/product");

module.exports = async (req, res) => {
    try {
        const products = await Product.find().sort({ ID: 1 });

        res.json({
            success: true,
            message: "Products fetched successfully",
            products,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: err,
        });
    }
};
