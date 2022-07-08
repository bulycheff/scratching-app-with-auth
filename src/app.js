require('dotenv').config();

if (typeof localStorage === 'undefined' || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./storage');
}

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { getScratch } = require('./nightmare');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/update', async (req, res) => {
  try {
    const data = await getScratch();
    res.json({
      success: true,
      data: data,
    }).status(200);
  } catch (e) {
    res.json({
      success: false,
      data: e.message,
    }).status(400);
  }
});

app.get('/api/fetchPreload', async (req, res) => {
  try {
    const data = JSON.parse(localStorage.getItem('scr'));
    res.json({
      success: true,
      data: data,
    }).status(200);
  } catch (e) {
    res.json({
      success: false,
      data: e.message,
    }).status(400);
  }
});

setInterval(async () => {
  try {
    await getScratch();
  } catch (e) {
    console.log({
      message: e.message,
      description: 'interval delivery data update failed...',
    });
  }
}, 30 * 60 * 1000);

module.exports = app;
