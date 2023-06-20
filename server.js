const express = require('express')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')

const PORT = 3001;
const articalRoutes = require('./routes/articals')

mongoose.connect('mongodb://localhost/toutBlog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

app.use('/art', articalRoutes)


app.listen(PORT, () => {
    console.log(`app live at http://localhost:${PORT}`)
})