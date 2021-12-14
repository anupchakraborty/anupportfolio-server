const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.93dpr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);

async function run(){
    try{
        await client.connect();
        // console.log('connected');

        const database = client.db('anupportfolio');
        const projectsCollection = database.collection('projects');

        //Get API
        app.get('/projects', async (req, res) => {
        const cursor = projectsCollection.find({});
        const projects = await cursor.limit(10).toArray();
        res.send(projects);
        // res.send('projects');
        })

        //Get API
        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const qurey = {_id: ObjectId(id)};
            const project = await projectsCollection.findOne(qurey);
            res.json(project);
        })

    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Anup Portfolio Server Running !');
})
app.get('/hello', (req, res)=>{
    res.send('Anup Portfolio Server from hello !');
})

app.listen(port, ()=>{
    console.log('Anup Portfolio Server is Running !', port);
})