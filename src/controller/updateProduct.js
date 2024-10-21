const Product = require("../modules/product");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
    const { id } = req.params; 
    const { newName, newPrice, newID } = req.body; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }

        if (newID && newID !== product.ID) {
            await adjustProductIDs(product.ID, newID);
        }

        product.Name = newName || product.Name;
        product.Price = newPrice || product.Price;

        await product.save();

        res.json({ success: true, message: "Product updated successfully", product });
    } catch (err) {
        res.status(500).send({ success: false, message: "Failed to update product", error: err });
    }
};

async function adjustProductIDs(oldID, newID) {
    const TEMP_ID = -1; 

    if (newID < oldID) {
        await Product.updateOne({ ID: oldID }, { ID: TEMP_ID });

        await Product.updateMany(
            { ID: { $gte: newID, $lt: oldID } },
            { $inc: { ID: 1 } }
        );

        await Product.updateOne({ ID: TEMP_ID }, { ID: newID });
    } else {
        await Product.updateOne({ ID: oldID }, { ID: TEMP_ID });

        await Product.updateMany(
            { ID: { $gt: oldID, $lte: newID } },
            { $inc: { ID: -1 } }
        );

        await Product.updateOne({ ID: TEMP_ID }, { ID: newID });
    }
}
