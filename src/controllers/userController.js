const { readData, writeData } = require('../models/userModel');

const getAllUsers = async (req, res) => {
  const data = await readData();
  res.json(data.usuario);
};

const getUserById = async (req, res) => {
  const data = await readData();
  const id = parseInt(req.params.id);
  const user = data.usuario.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

const createUser = async (req, res) => {
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
};

module.exports = { getAllUsers, getUserById, createUser };