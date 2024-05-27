const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const readData = () => {
  try {
    const data = fs.readFileSync('./db.json');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return { usuario: [] };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
};

app.get('/', (req, res) => {
  res.send('Welcome to my first API with Node js!');
});

app.get('/usuarios', (req, res) => {
  const usuarios = readData();
  res.json(usuarios.usuario);
});

app.get('/usuarios/:id', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const user = data.usuario.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

app.post('/usuarios', (req, res) => {
  const data = readData();
  const body = req.body;
  const newUser = {
    id: data.usuario.length + 1,
    ...body,
  };
  data.usuario.push(newUser);
  writeData(data);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}...`);
});
