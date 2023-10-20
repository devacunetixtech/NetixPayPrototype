const userModel = require("../Models/userModel")
const Transaction = require("../Models/transactionModel")
//NPM I BCRYPT VALIDATOR JSONWEBTOKEN
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtkey, { expiresIn:"3d" });
};

const registerUser = async  (req, res) => {
    try{
        const {name, email, password} = req.body
        const balance = 0;
        let user  = await userModel.findOne({ email});
        if(user) 
            return res.status(400).json("This User Joined already ....");
        if(!name || !email || !password) 
            return res.status(400).json("All fields are required....")
        if(!validator.isEmail(email)) 
            return res.status(400).json("Email must be a valid email")
        if(!validator.isStrongPassword(password)) 
            return res.status(400).json("Password must be a strong one")
        //SAVING THE USER
        user = new userModel({name, email, password, balance})

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = createToken(user._id)
        res.status(200).json({_id:user._id, name, email, token, balance})
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
    
};

const loginUser = async  (req, res) => {
    const { email, password} = req.body;
    try{

        let user  = await userModel.findOne({ email });
        if(!user) 
            return res.status(400).json("Invalid email or password..");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) 
            return res.status(400).json("Invalid email or password..");

        const token = createToken(user._id)
        res.status(200).json({_id:user._id, name:user.name, email, token, balance:user.balance})
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
    
};

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId)
        res.status(200).json(user);
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
};

const depositUser = async (req, res) => {
    const { email, amount } = req.body;

    try {
        // Find the user by their email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate the new balance after the payment
        const newBalance = user.balance + parseFloat(amount);

        // Update the user's balance in the database
        user.balance = newBalance;
        await user.save();

        res.json({ message: 'Payment successful', newBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment and user update error' });
    }
};

const transferUser = async (req, res) => {
  const { email, amount, payNarration, debitUserID } = req.body;

  try {
    // Find the user by their email (the recipient of the funds)
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Recipient user not found' });
    }

    // Find the user to be debited (the one initiating the transfer)
    const debitUser = await userModel.findById(debitUserID);

    if (!debitUser) {
      return res.status(404).json({ error: 'Debit user not found' });
    }

    if (debitUser.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance for the transfer' });
    }

    // Calculate the new balances after the transfer
    const newBalanceDebit = debitUser.balance - parseFloat(amount);
    const newBalanceCredit = user.balance + parseFloat(amount);

    // Update the user's balances in the database
    debitUser.balance = newBalanceDebit;
    user.balance = newBalanceCredit;

    // Save the transaction details in the Transaction model
    const transaction = new Transaction({
      senderUserID: debitUser._id,
      recipientUserID: user._id,
      amount: parseFloat(amount),
      narration: payNarration,
    });

    await transaction.save();
    await debitUser.save();
    await user.save();

    res.json({ message: 'Transfer successful', newBalanceDebit, newBalanceCredit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Transfer and user update error' });
  }
};

  

module.exports = { registerUser, loginUser, findUser, depositUser, transferUser};