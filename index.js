const express = require('express')
const app = express()
const req = require('express/lib/request')
const res = require('express/lib/response')
const bodyParser = require('body-parser')
const slug = require('slug')
const multer = require('multer')
const {redirect} = require('express/lib/response')
const upload = multer({dest: 'static/uploads/'})

app.use(express.static('static'))
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', upload.single('title'), function (req, res) {
  //var id = slug(req.body.title).toLowerCase()
  //Error: slug() requires a string argument, received undefined

  var choice = req.body.imagePick
  console.log(choice)
  res.render('succes', {choice: choice})
  res.redirect('/succes')
  //Error: Cannot set headers after they are sent to the client
})

app.get('*', (req, res) => {
  res.send('404 Not Found')
})

app.listen(3000, () => {
  console.log(`Listening on port 3000...`)
})
