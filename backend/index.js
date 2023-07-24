const express = require('express');
const bodyParser = require("body-parser");
const https = require('https');
const mongoose = require('mongoose');

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('Public'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FoodOrderingApp');

let FoodSchema = new mongoose.Schema({
    FoodName: String,
    FoodDescription: String,
    Price: Number,
    ProductId: String
});

const Food = new mongoose.model('Food',FoodSchema);

let OrderSchema = new mongoose.Schema({
    Name: String,
    Address: String,
    TotalAmount: Number,
    items: [FoodSchema]
})

const Order = new mongoose.model('Order',OrderSchema);


app.get('/',(req,res)=>{
    res.send("Server is Running On port 8080");
});

app.get('/AddFoodItem',(req,res)=>{
    res.render('AddFoodItem');
})

app.post('/addItem',async (req,res)=>{
    console.log("Form Recieved");
    let tempFood = new Food({
        FoodName: req.body.Name,
        FoodDescription: req.body.Ingredients,
        Price: req.body.Price,
        ProductId: req.body.ProductId
    });

    try{
        const newtempfood = await tempFood.save();
        console.log("Successfully Saved");
        
        return res.status(201).json({message: "User Registered Successfully"});

    } catch(err){
        console.log(err);
        return res.status(422).json({message: "Some Error Has Occured"});
    }
    
})

app.post('/makeneworder',async (req,res)=>{
    console.log('Request to form Order Recieved');
    // Add some code to validate the order.
    
    // Make Order
    let temporder = new Order({
        Name: req.body.Name,
        Address: req.body.Address,
        TotalAmount: req.body.TotalAmount,
        items: [...req.body.items]
    })

    try{
        const newordersave = await temporder.save();
        console.log("Order Placed");
        return res.status(201).json({message: "Order Placed"});
    }catch(err){
        console.log(err);
        return res.status(404).json({message: "Some error has Occured"});
    }
})



app.get("/getAllFoodItems",async (req,res)=>{
    // console.log("Request Recieved");
    const allddata = await Food.find({});

    res.status(201).json({body: allddata});
})

app.listen(8080,()=>{
    console.log("Server Has Started");
})
