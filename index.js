const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000


//yalinis2022cce
//tprbKwMfZOnJyhPU

//mongo db connection


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.Db_USER}:${process.env.Db_PASSWORD}@yoga.enuttbm.mongodb.net/?retryWrites=true&w=majority&appName=yoga`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create database&con
    const database = client.db(yoga);
    const userCollections = database.collection("users");
    const classesCollection = database.collection("classes");
    const cartCollection = database.collection("carts");
    const paymentCollection = database.collection("payments");
    const enrolledCollection = database.collection("enrolleds");
    const appiliedCollection = database.collection("appilied");

    app.post('/new-class',async (req,res)=>{
      const newClass = req.body;
      const result = await classesCollection.insertOne(newClass);
      req.send(result);

    })
    app.get('/classes',async(req,res)=>{
      const query={ status:'approved'};
      const  result = await classesCollection.find().toArray();
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello yadva yalini!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})