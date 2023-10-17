const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();
// console.log(process.env)

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// ${DB_USER}:${DB_PASSWORD}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@crudcluster.dd1eiv7.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    /*   const database = client.db("insertDB");
    const haiku = database.collection("haiku"); */

    const userCollection = client.db("userDB").collection("users");

    //getting multiple data

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      console.log(result);
      res.send(result);
    });


//find a document / getting single data for update
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const query = {
    _id: new ObjectId(id),
  }
  const result = await userCollection.findOne(query);
  console.log(result);
  res.send(result);
})

// update a document
app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(id,data);
  const filter = {_id: new ObjectId(id)};
  const options = { upsert: true };
  const updatedUser = {
    $set: {
     name: data.name,
     email: data.email,
     password: data.password,
    },
  };
  const result = await userCollection.updateOne(filter, updatedUser, options);
  res.send(result)
})

    // post single data
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      console.log(result);
      res.send(result);
    });

    //delete single users
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("id", id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await userCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("CRUD server is running");
});

app.listen(port, () => {
  console.log(`App is running on port" ${port}`);
});
