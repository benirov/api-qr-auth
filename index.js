const express = require('express');
const connectionDB = require('./config/db');
const cors = require('cors');

const app = express();

//conectar a la db
connectionDB();
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors());

const port = process.env.PORT || 4000;
app.use( express.json());

//rutas de la app
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.listen(port, '0.0.0.0', () => {
    console.log("server run");
})