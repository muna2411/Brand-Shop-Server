const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjcsd3j.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

 
const userCollection = client.db("usersDB").collection("users");
const userProduct = client.db("usersDB").collection("product");
const userBrand = client.db("usersDB").collection("brand");
const userAddToCart = client.db("usersDB").collection("cart");


app.get('/users',async(req,res) =>{
  const cursor = userCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})


app.get('/users/:id',async(req,res) =>{
  const id = req.params.id;
  console.log(id);
  
  const query = {_id: new ObjectId(id)}
  const user = await userCollection.findOne(query);
  res.send(user);
})


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
  const options = {upsert:true} 
  const updatedUser = {
    $set:{
      id:user.id,
      name:user.name ,
      brand:user.brand,
      types:user.types ,
      price:user.price ,
      description:user.description ,
      ratings:user.ratings ,
      image:user.image 
      
    }
  }
  const result = await userCollection.updateOne(filter , updatedUser ,options);
  res.send(result);
})


app.delete('/users/:id' , async(req,res) =>{
  const id = req.params.id;
  console.log('Delete' , id);
  
  const query = {_id: new ObjectId(id)}
  const result = await userCollection.deleteOne(query);
  res.send(result);
})


//add to cart

app.get('/cart',async(req,res) =>{
  const cursor = userAddToCart.find();
  const result = await cursor.toArray();
  res.send(result);
})

app.get('/cart/:id',async(req,res) =>{
  const id = req.params.id;
  console.log(id);
  
  const query = {_id: new ObjectId(id)}
  const user = await userAddToCart.findOne(query);
  res.send(user);
})


app.post('/cart' , async(req,res) =>{
  const cart = req.body;
  console.log('new user : ' , cart);
  const result = await userAddToCart.insertOne(cart);
  res.send(result);
})

app.delete('/cart/:id' , async(req,res) =>{
  const id = req.params.id;
  console.log('Delete' , id);
  
  const query = {_id: new ObjectId(id)}
  const result = await userAddToCart.deleteOne(query);
  res.send(result);
})



//products
app.get('/product',async(req,res) =>{
  const cursor = userProduct.find();
  const result = await cursor.toArray();
  res.send(result);
})

app.post('/product' , async(req,res) =>{
  const product = req.body;
  console.log('new user : ' , product);
  const result = await userProduct.insertOne(product);
  res.send(result);
})

// userBrand
// app.get('/users',async(req,res) =>{
//   const cursor = userBrand.find();
//   const result = await cursor.toArray();
//   res.send(result);
// })

// app.get('/users/:brand',async(req,res) =>{
//   const brand = req.params.brand;
//   console.log(brand);
//   const query = {brand: new ObjectId(brand)}
//   const user = await userBrand.findOne(query);
//   res.send(user);
// })

// app.post('/users/:brand' , async(req,res) =>{
//   const brand = req.body;
//   console.log('new user : ' , brand);
//   const result = await userBrand.insertOne(brand);
//   res.send(result);
// })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('simple crud')
})

app.listen(port, () => {
  console.log(`Example app simple crud on port ${port}`)
})