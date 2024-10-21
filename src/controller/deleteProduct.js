const Product = require("../modules/product");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }

        const deletedProductID = product.ID; 

        await Product.updateMany(
            { ID: { $gt: deletedProductID } },
            { $inc: { ID: -1 } }
        );

        return res.json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        return res.status(500).send({ success: false, message: "Failed to delete product", error: err });
    }
};
