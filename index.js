'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes/routes');

app.use(cors({ optionSuccessStatus: 200 }));
app.use(helmet());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index');
})

app.use('/api/shorturl', routes);

// 404 Handler
app.use('*', (req, res, next) => {
  res.sendStatus(404);
});

// Error handler
app.use(function(err, req, res, next) {
  console.error(err);
  res.sendStatus(500);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on', listener.address().port);
});
