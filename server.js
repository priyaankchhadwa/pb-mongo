const express = require('express');
const app = express();
const port = 3000;

const mongoose = require("mongoose")

const nameModel = require("./model/schema")

let url = 'mongodb://localhost:27017/pbmongo';

app.use('/', express.static('public'));
app.use(express.json());

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            nameModel.find().exec().
                then(data => {
                    res.json(data);
                    mongoose.connection.close();
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            // console.log(res);
            console.log(req.body);

            var newData = new nameModel({
                title: req.body.title,
                value: req.body.value,
                color: req.body.color
            });

            nameModel.insertMany(newData).then(data => {
                res.send('inserted into the database')
                mongoose.connection.close();
            })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});