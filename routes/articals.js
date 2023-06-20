const router = require('express').Router()
const Article = require('../models/article')

router.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        title: 'desc'
    })
    res.render('articals/index', { articles: articles})
})

router.get('/new', (req, res) => {
    res.render('articals/new')
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    console.log(article)
    if(article == null) res.redirect('/art')
    res.render('articals/show', { article: article})
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save()
        res.redirect(`/art/${article.slug}`)
    } catch(err){
        console.log(err)
        res.render('articals/new', { article: article })
    }
    
})

router.delete('/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/art')
})
module.exports = router;