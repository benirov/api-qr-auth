const jwt = require('jsonwebtoken');
require("dotenv").config({path: '.env'});

module.exports = (req, res, next) => {

    const authHeader = req.get('authorization');
    if(authHeader){
        //obtener token 
        const token = authHeader.split(' ')[1];
        try {
        //comporbar toekn
            const user = jwt.verify(token, process.env.SECRET);
            req.user = user 
        } catch (error) {
            console.log("error in auth", error);
        }
    }

    return next();   
}