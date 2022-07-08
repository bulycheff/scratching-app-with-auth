require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT;

console.clear();

app.get('/go', async (req, res) => {
  try {
    console.log({ success: true, data: 'ok' });
    res.status(200).json('ok');
  } catch (e) {
    console.log({ success: false, data: e });
    res.status(400).json(JSON.stringify(e));
  }
  
});

app.listen(PORT, () => {
  console.log(`APP STARTED ON PORT ${PORT}.`);
});
