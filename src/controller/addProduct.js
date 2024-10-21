const Product  = require("../modules/product");

module.exports = async (req, res) => {

    const {
        productName,
        productPrice,
    } = req.body;


    try {

        const productCount = await Product.countDocuments();
        const newProductID = productCount + 1;

        const newProduct  = new Product ({
            Name: productName,
            Price: productPrice,
            ID: newProductID,
        });

        await newProduct .save()
            .then((result) => {
                res.json({
                    Product : true,
                    message: "Product Added successfully",
                });
                return;
            })
            .catch((err) => {
                res.send({
                    Product : false,
                    message: "Failed to store new product",
                    reason: err,
                });
            });
    } catch (err) {
        res.send({
            Product : false,
            message: "Failed to store new product",
            reason: err,
        });
    }
    return;
};
