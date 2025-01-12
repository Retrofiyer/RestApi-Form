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

app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/view/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}...`);
});