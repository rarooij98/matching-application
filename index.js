const express = require('express')
const app = express()
const req = require('express/lib/request')
const res = require('express/lib/response')
const bodyParser = require('body-parser')
const slug = require('slug')
const multer = require('multer')
const {redirect} = require('express/lib/response')
const upload = multer({dest: 'static/uploads/'})
const data = []

app.use(express.static('static'))
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/movie', (req, res) => {
  res.render('movie')
})

app.post('/', upload.single('title'), function (req, res) {
  console.log(req.body.file, req.body)

  //var id = slug(req.body.title).toLowerCase()
  //slug needs string?

  data.push({
    //id: id,
    title: req.body.title,
    plot: req.body.plot,
    description: req.body.description,
  })

  console.log(data)
  //res.redirect('/' + id)
  res.redirect('/movie')
})

app.get('*', (req, res) => {
  res.send('404 Not Found')
})

app.listen(3000, () => {
  console.log(`Listening on port 3000...`)
})
