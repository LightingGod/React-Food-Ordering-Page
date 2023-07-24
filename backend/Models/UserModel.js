const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FoodOrderingApp');

let UserModel = new mongoose.Schema({
    UserId: String,
    UserAddress: String,
    UserOrerDetails:{}
})