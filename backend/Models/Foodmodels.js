const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FoodOrderingApp');

let FoodSchema = new mongoose.Schema({
    FoodName: String,
    FoodDescription: String,
    Price: Number,
    ProductId: String
});

module.export = FoodSchema;