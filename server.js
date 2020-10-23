require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

console.log(process.env.API_TOKEN)

const app = express();

app.use(morgan('dev'));

app.use((req, res) => {
  res.send('Hello, World!')
})

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost${PORT}`)
});