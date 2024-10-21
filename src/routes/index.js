const express = require("express");
const router = express.Router();

const addProduct = require("../controller/addProduct");
const updateProduct = require("../controller/updateProduct");
const deleteProduct = require("../controller/deleteProduct");
const getProduct = require("../controller/getProduct");


//----------------------------------------------------------------------------------------------

//routing for Product details
router.post("/addProduct", addProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getProduct", getProduct);

module.exports = router;