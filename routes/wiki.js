const express = require('express');
const router = express.Router();
const { Page } = require("../models");
const { addPage } = require("../views");
const { wikipage } = require('../views/wikipage.js');


module.exports = router;

router.get('/', (req, res, next) => {
    res.send('assdfasdfs');
});

router.post('/', async (req, res, next) => {
    const page = new Page({
        title: req.body.title ,
        content: req.body.content
      });

    try {
        await page.save();
        res.redirect('/');
      } catch (error) { next(error) }
});


router.get('/add', (req, res, next) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        console.log('ASDFASDFDS', page)
        res.json(wikipage(page))
    }catch(error){
        next(error);
    }
});