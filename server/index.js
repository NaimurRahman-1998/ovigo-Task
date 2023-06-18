const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gexkyvp.mongodb.net/?retryWrites=true&w=majority`;

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
        // await client.connect();

        const usersCollection = client.db('booking').collection('users')
        const roomsCollection = client.db('booking').collection('rooms')
        const reserveCollection = client.db('booking').collection('reserve')
        const regionsCollection = client.db('booking').collection('region')


        app.get('/users' , async(req,res)=>{
            try {
                const result = await usersCollection.find().toArray();
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })
        app.put('/users/:email', async (req, res) => {
            try {
                const user = req.body;
                const query = { email: user.email }
                const existingUser = await usersCollection.findOne(query);

                if (existingUser) {
                    return res.send({ message: 'user already exists' })
                }

                const result = await usersCollection.insertOne(user);
                res.send(result);
            } catch (error) {
                res.send(error)
            }
        })

        app.patch('/users/admin/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $set: {
                        role: 'admin'
                    },
                };

                const result = await usersCollection.updateOne(filter, updateDoc);
                res.send(result);
            } catch (error) {
                res.send(error)
            }
        })

        

        app.get('/regions' , async(req,res)=>{
            try {
                const result = await regionsCollection.find().toArray()
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })


        app.get('/rooms' , async(req,res)=>{
            try{
                const result = await roomsCollection.find().toArray()
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        app.get('/rooms/:id' , async(req,res)=>{
            try {
                const id = req.params.id;
                const query = {_id : new ObjectId(id)}
                const result = await roomsCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                res.send(error)
            }
        })

        app.get('/allRoomsByName/:text', async (req, res) => {
            try {
                const searchText = req.params.text;
                const result = await roomsCollection.find({
                    $or: [
                        { region: { $regex: searchText, $options: "i" } },
                    ],
                }).toArray();
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        app.put('/rooms/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const body = req.body;
                const updatedRoom = {
                    $set: {
                        price: body.price,
                    }
                }
                const result = await roomsCollection.updateOne(query, updatedRoom);
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })
        app.post('/rooms', async (req, res) => {
            try {
                const data = req.body;
                const result = await roomsCollection.insertOne(data)
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        app.get('/reserve' , async(req,res)=>{
            try {
                const result = await reserveCollection.find().toArray();
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        app.post('/reserve' , async(req,res)=>{
            try {
                const body = req.body;
                const result = await reserveCollection.insertOne(body);
                res.send(result)
            } catch (error) {
                res.send(error)
            }
        })

        app.delete('/reserve/:id' , async(req,res)=>{
            try {
                const id = req.params.id;
                const query = {_id : new ObjectId(id)}
                const result = await reserveCollection.deleteOne(query)
                res.send(result)
            } catch (error) {
                
            }
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello booking!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})