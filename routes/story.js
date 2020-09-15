'use strict';

const express = require('express');
const router = express.Router();
const {story} = require('../models/index');


router.get('/', function(req, res, next) {
  story.findAll({})
    .then((result)=>
    console.log(result))
});

module.exports = router;
