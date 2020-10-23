require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const MOVIES = require('./movies-data-small.json');


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  console.log('validate bearer token middleware')
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res
      .status(401)
      .json({ error: 'Unathorized Request'})
  }
  next()
});

app.get('/movie', function handleGetMovie(req, res) {
  let response = MOVIES;
  
  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())  
    )
  }

  if (req.query.country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }

  if (req.query.avg_vote) {
    const voteScore = parseFloat(req.query.avg_vote)

    response = response.filter(movie => 
      movie.avg_vote >= voteScore  
    )
  }

  res
    .status(200)
    .json(response)
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost${PORT}`)
});