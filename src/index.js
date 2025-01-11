const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const { getAllUsers, getUserById, createUser } = require('./controllers/userController');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

app.get('/usuarios', getAllUsers);
app.get('/usuarios/:id', getUserById);
app.post('/usuarios', createUser);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}...`);
});