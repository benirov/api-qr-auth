const socketIO = require('socket.io');

exports.io = async (server) => {
    socketIO(server);
}