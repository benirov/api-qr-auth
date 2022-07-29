const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require("dotenv").config({path: '.env'});

exports.authUser = async (req, res, next) => {

    //mostrar mensajes de error
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }
    

    //buscar usuario
    const { email, password } = req.body;
    let user = await User.findOne({email});

    if(!user){
        res.status(401).json({message: "Email not found"});
        return next();
    }

    //verificar password y autenticar
    if(!bcrypt.compareSync(password, user.password)){
        res.status(401).json({message: "Wrong password"});
        return next();
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.SECRET, {
        expiresIn: '8h'
    });
    res.json({token});

} 

exports.userAuthenticate = async (req, res) => {

  
    return res.json({ usuario: req.user});

} 