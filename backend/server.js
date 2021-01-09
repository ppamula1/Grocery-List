var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jwt-simple')
var cors = require('cors')


var app = express()

mongoose.Promise = Promise

mongoose.connect('mongodb://test:test@ds239940.mlab.com:39940/grocery', (err) => {
    if(!err)
        console.log('connected to mongo')
})

var db = mongoose.connection

db.on("error", console.error.bind(console, "connection error"))

var Schema = mongoose.Schema;

var grocerySchema = new Schema ({
  grocery: String,
  checked: Boolean,
  userId: String, 
  counter: Number
})

grocerySchema.index({grocery: 1, userId: 1}, { unique: true });
var Groceries = mongoose.model("Groceries", grocerySchema)

app.use(cors())
app.use(bodyParser.json())

app.get('/groceries', async (req, res) => {
  var myData = new Groceries(req.query);
  Groceries.find({userId: req.query.userId}).sort({checked:"descending",counter:"descending"}).exec(function(err, data){
    if(err)
      console.log(err);
    else
      res.send(data);
    })         
})

app.post('/update', (req, res) => {
  var counter = 1;
  res.send(req.body);
 Groceries.find({userId: req.body.userId, grocery: req.body.grocery}, "-__v -_id", function(err,data){
  if(err){
    console.log(err);
  }else if(data[0] != undefined)
      { 
        if(req.body.checked){
          counter = data[0].counter+1;
        }else{
          counter = data[0].counter;
        }
        console.log(req.body.grocery + ": " + counter);
    }else{
      var myData = new Groceries(req.body)

      myData.save()
        .then(  
          Groceries.find(function(err,data){
          if(err)
            console.log(err);
          else {
            //res.send(data);
          }
          }  
          ))
        .catch(err => {
          //res.status(400).send("unable to save to database");
        })
      
   }
  Groceries.update({ grocery: req.body.grocery, userId: req.body.userId }, { $set: { checked: req.body.checked, counter: counter}}, function (err, data) {
        if(err){
         // console.log(err);
        }
        else {
          //res.send(req.body);  
        }
        })
 })

  
})

app.post('/groceries', async (req, res) => {
  console.log(req.body)
  var myData = new Groceries(req.body)

  myData.save()
    .then(  
      Groceries.find(function(err,data){
      if(err)
        console.log(err);
      else {
        res.send(data);
      }
      }  
      ))
    .catch(err => {
      res.status(400).send("unable to save to database");
    })
})
app.listen(3000)