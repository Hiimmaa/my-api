const express = require('express');
const connectDB = require('./dp')
const Data = require('./data');

const app = express();
app.use(express.json());

connectDB();


app.get('/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).send(error, message)
    }
});


app.get('/data/:id', async (req, res) => {    //http://localhost:3000/data/1
    try {
        const data = await Data.findById(req.params.id);
        if (!data) throw new Error('data not found');
        res.json(data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/data', async (req, res) => {    //http://localhost:3000/data/1
    try {
        const { id, name, age, gender, email } = req.body;
        const data = new Data({ id, name, age, gender, email });
        await data.save();
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.put('/data/:id', async (req, res) => {    //http://localhost:3000/data/1
    try {
        const data = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) throw new Error('data not found');
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.delete('/data/:id', async (req, res) => {    //http://localhost:3000/data/1
    try {
        const data = await Data.findByIdAndDelete(req.params.id);
        if (!data) throw new Error('data not found');
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});



const port = 5000;

app.listen(port, () => {
    console.log("API server started on port 5000")
})