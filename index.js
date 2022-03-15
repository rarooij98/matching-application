const express = require('express')
const app = express()
const req = require('express/lib/request')
const res = require('express/lib/response')
const bodyParser = require('body-parser')
const slug = require('slug')
const multer = require('multer')
const {redirect} = require('express/lib/response')
const upload = multer({dest: 'static/uploads/'})
const {MongoClient} = require('mongodb')
const {ObjectId} = require('mongodb');
const dotenv = require('dotenv').config()

const port = process.env.PORT || 3000
let db = null

// middleware //
app.use(express.static('static'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

// set view engine //
app.set('view engine', 'ejs')
app.set('views', 'views')

// routes //
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/studie', (req, res) => {
  res.render('studie')
})

app.get('/methode', (req, res) => {
  res.render('methode')
})

app.get('/update', (req, res) => {
  res.render('update')
})

// er wordt uit het 1e formulier een keuze gehaald en opgeslagen in de database
// daarna wordt de gebruiker doorgestuurd naar de pagina met het 2e formulier
app.post('/studie', upload.single(), (req, res) => {
  db.collection('voorkeuren').insertOne({studie: req.body.studie})
  res.redirect('methode')
})

// er wordt uit het 2e formulier een keuze gehaald en toegevoegd aan het zojuist gemaakte object in de database
// daarna wordt de gebruiker doorgestuurd naar de 'succes' pagina
app.post('/methode', upload.single(), (req, res) => {
  db.collection('voorkeuren').updateOne({}, {$set: {methode: req.body.methode}})
  res.redirect('succes')
})

// dan worden alle keuzes opgehaald uit de database en gepost op de succes pagina
app.get('/succes', async (req, res) => {
  const studie = await db.collection('voorkeuren').findOne()
  res.render('succes', {studie: studie.studie, methode: studie.methode})
});

// om data te updaten
app.post('/update', upload.single(), (req, res) => {
  db.collection('voorkeuren').updateOne({}, {$set: {studie: req.body.studie}})
  res.redirect('methode')
})

// gebruiker kan de keuzes inzien op de profiel pagina
app.get('/profiel', async (req, res) => {
  const studie = await db.collection('voorkeuren').findOne()
  res.render('profiel', {studie: studie.studie, methode: studie.methode})
});

// gebruiker kan data verwijderen op de profiel pagina
app.post('/profiel', (req, res) => {
  db.collection('voorkeuren').updateOne({}, {$unset: {studie: ''}})
})

// 404  //
app.get('*', (req, res) => {
  res.send('404 Not Found')
})

// connect to db //
async function connectDB() {
  const uri = process.env.CONNECTION_STRING
  const options = {useUnifiedTopology: true, useNewUrlParser: true}
  const client = new MongoClient(uri, options)
  await client.connect()
  db = await client.db(process.env.DB_NAME)
}

// start the server //
app.listen(port, () => {
  console.log(`Listening on port 3000...`)
  connectDB()
    .then(() => {
      console.log('We have a connection to mongo!')
    })
    .catch((error) => {
      console.log(error)
    })
})