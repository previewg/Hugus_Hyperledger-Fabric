"use strict";

const express = require("express");
const router = express.Router();
const {Hashtag, Story_Hashtag, Search_Hashtag, Story_File, Story, sequelize} = require("../models");

// 해시태그 목록 조회
router.get("/all", async (req, res) => {
    try {
        const hashtags = await Hashtag.findAll({attributes: ["hashtag"]});
        res.json({success: 1, list: hashtags});
    } catch (error) {
        console.error(error);
        res.status(400).json({success: 3});
    }
});
router.post("/search", async (req, res) => {
    const search = req.body.search
    console.log(req.body)

    try {
        const search_data = await Hashtag.findOne({
            where: {hashtag: search}, attributes: ["id"],
        })
        if(search_data !== null){
            const list = await Story_Hashtag.findAll({
                where: {hashtag_id: search_data.dataValues.id},
                include: [
                    {model: Story,attributes:[ "story_title", "story_goal", "visited"]},
                    {model: Hashtag, attributes: ["hashtag"]},
                    {model: Story_File, attributes: ["file"], limit: 1},
                ],
            });
            res.json({list: list, success: 1})
        }
        else{
            res.json({success:3})
        }


    } catch (err) {
        res.json({success: 2})
        console.log(err)
    }
})

module.exports = router;
