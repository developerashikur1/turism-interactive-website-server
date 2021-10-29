const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
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
        const cityDataCollection = database.collection('exploreCityData')


        app.get('/exploreCityData', async (req, res) => {
            const result = await cityDataCollection.find({}).toArray();
            console.log('client connected')
            res.send(result)
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
    console.log('netWork type gotted')
})