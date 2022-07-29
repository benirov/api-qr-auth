const Sockect = require('../models/Sockect');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
exports.saveSockectConextion = async (id) => {
    //validate inf exists
    let sockectFind = await Sockect.findOne({idSockect: id});
    if(!sockectFind){
        let sockectModel = new Sockect({idSockect: id});
        sockectModel.save(); 
    } 
}

exports.updateSockectConextion = async (id, data) => {
    //validate inf exists
    let sockectFind = await Sockect.findOneAndUpdate({'idSockect': id}, data, {upsert: true});
    if(!sockectFind){
        let sockectModel = new Sockect({idSockect: id});
        sockectModel.save(); 
    } 
}


exports.sigInPermision = async (req, res) => {

    //mostrar mensajes de error
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }


    //validate inf exists
    let data =  await Sockect.findOne({idSockect: req.params.id});

    if(data){
        return res.status(200).json({data});
    }else{
        return res.status(400).json({message: "Not Found"});
    }
}

exports.loginInPermision = async (req, res) => {

    let socketid = req.body.sockectId;

    const token = jwt.sign({
        id: req.user._id,
        username: req.user.username
    }, process.env.SECRET, {
        expiresIn: '8h'
    });
    console.log('socketid', socketid);
    global.io.to(socketid).emit('SyncClient', token);
}

