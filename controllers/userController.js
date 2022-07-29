const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')

exports.newUser = async (req, res) => {

    //mostrar mensajes de error
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }
    

    //verificar email
    const { email, password, username } = req.body;
    let user = await User.findOne({email});

    if(user){
        return res.status(400).json({message: "User exist"});
    }

    user =new User(req.body);
    //hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.save();
    res.json({message: "User register success"});

} 