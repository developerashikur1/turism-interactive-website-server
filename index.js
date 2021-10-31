const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()



const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jbkru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// MiddleWare
app.use(cors());
app.use(express.json());



async function run() {
    try {
        await client.connect();
        const database = client.db('vmTravels');
        const cityDataCollection = database.collection('exploreCityData');
        const customerChoiceCollection = database.collection('customerChoice');
        // console.log("database", customerChoiceCollection)


        // GET CITY DATA
        app.get('/exploreCityData', async (req, res) => {
            const result = await cityDataCollection.find({}).toArray();
            res.send(result)
        });


        // GET ONE CITY DATA
        app.get('/exploreCityData/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await cityDataCollection.findOne(query);
            res.json(result)
        })


        // POST CUSTOMER CHOICE
        app.post('/customerChoice', async (req, res) => {
            const newUser = req.body;
            const result = await customerChoiceCollection.insertOne(newUser);
            // console.log('customer gotted', result);
            res.json(result);
        })

        // GET CUSTOMER CHOICE DATA
        app.get('/customerChoice', async (req, res) => {
            const result = await customerChoiceCollection.find({}).toArray();
            // console.log(' got customer data', result);
            res.json(result);
        })


        // QUERY USER
        app.post('/customerChoice/email', async (req, res) => {
            const mail = req.body;
            const query = { email: { $in: mail } };
            const result = await customerChoiceCollection.find(query).toArray();
            // console.log('query user gotted', result)
            res.json(result);
        })


        // DELETE METHOD WITH ID
        app.delete('/customerChoice/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await customerChoiceCollection.deleteOne(query);
            res.json(result)
        })



    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    console.log('travels is opening');
    res.send('response saved')
})

app.listen(port, (req, res) => {
    console.log(' net Work type gotted')
})