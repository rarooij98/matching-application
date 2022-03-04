const {MongoClient} = require('mongodb')
require('dotenv').config()

const url =
  //'mongodb+srv://new-user:XIudnOuIDew845MO@cluster1.p80ea.mongodb.net/cluster1?retryWrites=true&w=majority'
  'mongodb+srv://' +
  process.env.USERNAME +
  ':' +
  process.env.PASSWORD +
  '@cluster1.p80ea.mongodb.net/cluster1?retryWrites=true&w=majority'
const client = new MongoClient(url)

async function run() {
  try {
    await client.connect()
    console.log('Connected correctly to server')
  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
