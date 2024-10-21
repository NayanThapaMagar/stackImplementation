const express = require('express')
const mongoose = require("mongoose");
const app = express()
require("dotenv").config();
const router = require('./src/routes/index'); 

const port = 5000;
const dbURI = process.env.DB_URI;

app.use(express.json());

app.use("/", router);

mongoose
    .connect(dbURI)
    .then(() => {
        console.log("App connected to database");
        //server start
        app.listen(port, () => {
            console.log(`server at ${port}`);
        });
    })
    .catch((error) => {
        console.log('error', error);
    });