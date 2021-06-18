var express = require('express');
var cors = require('cors'); // We will use CORS to enable cross origin domain requests.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();

var schemaName = new Schema({
    ["Insitution Name"]:String,
    ["Branch Name"]:String,
    Address:String,
    City:String ,
    ["Contact Number"]:String,
    ["Branch Incharge"]:String,
    ["Pincode covered"]:String 
}, {
    collection: 'data'
});

var Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://127.0.0.1:27017/BeetleNut',{
    useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
});

// Getting Data From DataBase

app.get('/data', cors(),async (req, res)=> {

   await Model.find({}, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    })
})


app.listen(3001, function() {
    console.log('Node.js listening on port ');
});