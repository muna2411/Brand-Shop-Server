const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

//nurnaharmuna2411
//o1dWPUeqOOUvDqLK

const uri = "mongodb+srv://nurnaharmuna2411:o1dWPUeqOOUvDqLK@cluster0.pjcsd3j.mongodb.net/?retryWrites=true&w=majority";


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


const userCollection = client.db("usersDB").collection("users");

//all user ke paoa jabe
app.get('/users',async(req,res) =>{
  const cursor = userCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})

//specific user ke update korar jonno
app.get('/users/:id',async(req,res) =>{
  const id = req.params.id;
  console.log('Delete' , id);
  
  const query = {_id: new ObjectId(id)}
  const user = await userCollection.findOne(query);
  res.send(user);
 
})

//user create er jonno
app.post('/users' , async(req,res) =>{
  const user = req.body;
  console.log('new user : ' , user);
  const result = await userCollection.insertOne(user);
  res.send(result);
})

app.put('/users/:id' , async(req,res) =>{
  const id = req.params.id;
  const user = req.body;
  console.log(id , user);

  const filter = {_id: new ObjectId(id)}
  const options = {upsert:true} //optional kaj
  const updatedUser = {
    $set:{
      name:user.name ,
      email: user.email
    }
  }
  const result = await userCollection.updateOne(filter , updatedUser ,options);
  res.send(result);
})

//specific kono user ke delete korar jonno
app.delete('/users/:id' , async(req,res) =>{
  const id = req.params.id;
  console.log('Delete' , id);
  
  const query = {_id: new ObjectId(id)}
  const result = await userCollection.deleteOne(query);
  res.send(result);
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('simple crud')
})

app.listen(port, () => {
  console.log(`Example app simple crud on port ${port}`)
})