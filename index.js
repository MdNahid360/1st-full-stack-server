const express = require('express')
const app = express()
// database connecting...
const MongoClient = require('mongodb').MongoClient;



const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json())

console.log(process.env.DB_USER);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// connecting database......


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nudw4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("freshValley").collection("allProduct");

app.get('/products', (req, res) =>{
   productCollection.find()
   .toArray((error, items) =>{
    res.send(items)
  })
})

    app.post('/addProduct', (req, res) => {
        const newProduct = req.body;
        console.log('add new product', newProduct);
        productCollection.insertOne(newProduct)
        .then(result => {
          console.log('insearted count',result.insertedCount);
            res.send(result.insertedCount > 0)
        })
    })

  //   client.close();
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
