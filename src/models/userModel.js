const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '../db/db.json');

const readData = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    return { usuario: [] };
  }
};

const writeData = async (data) => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing file:', error);
  }
};

module.exports = { readData, writeData };