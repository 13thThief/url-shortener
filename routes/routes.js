'use strict';

let express = require('express');
let router = express.Router();

let controller = require('../controllers');

/* ROUTE /api/shorturl/ */

// GET /api/shorturl/:short_url
router.get('/:short_url', controller.fetch);

// POST /api/shorturl/new
router.post('/new', controller.create);

module.exports = router;
