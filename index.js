const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const readData = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, './db.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    return { usuario: [] };
  }
};

const writeData = async (data) => {
  try {
    await fs.writeFile(path.join(__dirname, './db.json'), JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing file:', error);
  }
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/hello', (req, res) => {
  res.send("Hola mundito");
});

app.get('/usuarios', async (req, res) => {
  const usuarios = await readData();
  res.json(usuarios.usuario);
});

app.get('/usuarios/:id', async (req, res) => {
  const data = await readData();
  const id = parseInt(req.params.id);
  const user = data.usuario.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

app.post('/usuarios', async (req, res) => {
  const data = await readData();
  const body = req.body;

  if (!body.firstName || !body.lastName || isNaN(body.age)) {
    return res.status(400).json({ message: 'Nombre, apellido y edad son requeridos' });
  }

  const newUser = {
    id: data.usuario.length ? Math.max(...data.usuario.map(user => user.id)) + 1 : 1,
    ...body,
  };

  data.usuario.push(newUser);
  await writeData(data);
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}...`);
});