const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    
    {
        name: {type: String, required: true, minlength: 3, maxlength: 30},
        email: {type: String, required: true, minlength: 3, maxlength: 100, unique: true},
        password: {type: String, required: true, minlength: 3, maxlength: 1024},
        transactionPin: {type: Number, required: true, minlength: 3, maxlength: 100},
        balance: {type: Number, required: true, minlength: 3, maxlength: 1024},
        userAcctNumber: {type: String, required: true, minlength: 3, maxlength: 10124},
        resetToken: { type: String, default: null },
        resetTokenExpires: { type: Date, default: null },
    },{
        timestamps:true ,
    }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;