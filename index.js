require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// Routers
const usuarioRouter = require('./src/modules/user/user.routes');
const taskRouter = require('./src/modules/task/task.routes');

// Secure setup (descomentar si es necesario)
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;  // Aseguramos que el puerto tenga un valor por defecto

// Enable CORS
app.use(cors());

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.DB_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

mongoose.connection.on('connected', () => {
  console.log('Conectado a la base de datos MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error en la conexión a la base de datos:', err);
});

app.get("/", async (request, response) => {
  return response.send("Backend reclamos node js express");
});

// Routers
app.use(usuarioRouter);
app.use(taskRouter);

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-UserId, X-Nonce' +
    ', X-Secret, X-Ts, X-Sig, X-Vendor-Sig, X-Vendor-Apikey, X-Vendor-Nonce, X-Vendor-Ts, X-ProfileId' +
    ', X-Authorization, Authorization, Token, Pragma, Cache-Control, Expires');
  res.header('Access-Control-Allow-Methods', 'HEAD,OPTIONS,GET,PUT,POST,DELETE');
  next();
});

var options = {
  explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.listen(port, () => {
  console.log(`Sistema escuchando en el puerto ${port}.`);
});


