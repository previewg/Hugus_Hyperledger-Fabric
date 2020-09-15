'use strict';

const express = require('express');
const router = express.Router();
const {Story} = require('../models');


router.get('/', function(req, res, next) {
  Story.findAll({})
    .then((result)=>
    console.log(result))
});

module.exports = router;
