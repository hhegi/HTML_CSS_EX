const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost";
let db = null;

async function connectDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    db = client.db("vehicle");
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
