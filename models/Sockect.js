const mongoose = require("mongoose");

const SockectSchema = mongoose.Schema({  
    idSockect: {
        type: String,
        require: true,
        unique:true,
        trim: true
    },
    userAgent: {type: String},
    appCodeName: {type: String},
    appName: {type: String},
    platform: {type: String},
}, { timestamps: true });

module.exports = mongoose.model('Sockect', SockectSchema);