const mongoose = require("mongoose");
require("dotenv").config({path: '.env'});

const connectionDB = async () => {

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        console.log("success db connection");
    } catch (error) {
        console.log("DB connection error", error);
        process.exit(1);
    }
}

module.exports = connectionDB