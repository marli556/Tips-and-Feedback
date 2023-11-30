
const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const path = require('path');
const fs = require('fs');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  res.sendFile(path.join(__dirname, '../db/diagnostics.json '))
});

// POST Route for error logging
diagnostics.post('/', async (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  try {
    const newData = req.body;

    newData.id = uuidv4();

    // creating a const path to diagnostics.json
    const filePath = path.join(__dirname, '../db/diagnostics.json');

    // Appending new data to the file
    await fs.appendFile(filePath, JSON.stringify(newData) + '\n', (err) => {
      if (err) {
        console.error('Error appending data to diagnostics.json:', err);
        res.status(500).send('Error writing to diagnostics.json');
      } else {
        console.log('Data appended to diagnostics.json');
        res.json({ message: 'Data appended to diagnostics.json' });
      }
    });
  } catch (err) {
    console.error('Error appending!:', err);
    res.status(500).send('Error writing to diagnostics.json');
  }
});



module.exports = diagnostics;
