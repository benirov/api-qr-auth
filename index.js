const express = require('express');
const connectionDB = require('./config/db');
const cors = require('cors');
const {saveSockectConextion, updateSockectConextion} = require('./controllers/sockectController');
const socketIo = require('socket.io')

const connections = [];
const app = express();

//conectar a la db
connectionDB();
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors({
    origin: ['http://localhost:3000']
}));

const port = process.env.PORT || 4000;
app.use( express.json());




//rutas de la app
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sockect', require('./routes/sockect'));

const server = app.listen(port, '0.0.0.0', () => {
    console.log("server run", port);
});

const io = socketIo(server,{ 
    cors: {
      origin: process.env.FRONTEND_URL
    }
}) //in case server and client run on different urls
global.io = io;

io.sockets.on('connection', async (socket) => {
    connections.push(socket);
    await saveSockectConextion(socket.id);

    socket.on("syncClient" , async (data)=>{

        await updateSockectConextion(socket.id, data);
    });
});