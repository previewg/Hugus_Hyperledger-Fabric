'use strict';

const express = require('express');
const router = express.Router();
const {Story} = require('../models');


router.get('/', function(req, res, next) {
  Story.findAll({})
    .then((result)=>
    console.log(result))
});

router.post("/write",(req,res,next)=>{
  res.json({res:req.body.ex});
})

module.exports = router;
