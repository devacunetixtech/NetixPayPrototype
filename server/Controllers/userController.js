const userModel = require("../Models/userModel")
const transactionModel = require("../Models/transactionModel")
//NPM I BCRYPT VALIDATOR JSONWEBTOKEN
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const uuid = require('uuid');
const axios = require("axios");
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtkey, { expiresIn:"3d" });
};

const registerUser = async  (req, res) => {
    try{
        const {name, email, password , transactionPin} = req.body
        const balance = 0;

        if (!/^\d{4}$/.test(transactionPin)) {
          return res.status(400).json("Transaction Pin must be a 4-digit number");
        }
        function generateAccountNumber() {
              // Generate a UUID (version 4)
            const uuidValue = uuid.v4();
              // Remove hyphens and convert to uppercase
            const cleanedUuid = uuidValue.replace(/-/g, '').toUpperCase();

            // Extract the first 10 characters
            const accountNumber = cleanedUuid.substring(0, 10);

            return accountNumber;
        }

        // Example usage
        const userAcctNumber = generateAccountNumber();
        console.log('Unique Account Number:', userAcctNumber);

        let user  = await userModel.findOne({ email});
        if(user) 
            return res.status(400).json("User Joined already ....");
        if(!name || !email || !password || !transactionPin) 
            return res.status(400).json("All fields are required....")
        if(!validator.isEmail(email)) 
            return res.status(400).json("Email must be a valid email")
        if(!validator.isStrongPassword(password)) 
            return res.status(400).json("Password must be a strong one")
        //SAVING THE USER
        user = new userModel({name, email, password, balance, userAcctNumber, transactionPin})

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = createToken(user._id)
        res.status(200).json({_id:user._id, name, email, token, balance, userAcctNumber})
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
            return res.status(400).json("Invalid Email");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) 
            return res.status(400).json("Invalid password..");

        const token = createToken(user._id)
        res.status(200).json({_id:user._id, name:user.name, email, token, balance:user.balance, userAcctNumber:user.userAcctNumber})
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
    
};

const getUserDetails = async (req, res) => {
  const userId = req.params.userId;
  try{
      const userData = await userModel.findById(userId)
      res.status(200).json(userData);
  }catch(error){
      console.log(error)
      res.status(500).json(error);
  }
};

const depositUser = async (req, res) => {
    const { email, amount, acctNo } = req.body;

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

        const depositTransaction = new transactionModel({
          tranType: "deposit",
          amount: parseFloat(amount),
          recipientAcctNo: acctNo,
        });
    
        await depositTransaction.save();
        await user.save();

        res.json({ message: 'Payment successful', newBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment and user update error' });
    }
};

const transferUser = async (req, res) => {
  const { userAcctNumber, amount, narration, transactionPin, debitUserID, debitUserName } = req.body;

  try {
    // Find the user by their account number (the recipient of the funds)
    const user = await userModel.findOne({ userAcctNumber });

    if (!user) {
      return res.status(404).json({ error: 'Recipient user not found' });
    }

    // Find the user to be debited (the one initiating the transfer)
    const debitUser = await userModel.findById(debitUserID);
    if (!debitUser) {
      return res.status(404).json({ error: 'Debit user not found' });
    }
    if (debitUser.balance <= amount) {
      return res.status(400).json({ error: 'Insufficient balance for the transfer' });
    }
    if (transactionPin != debitUser.transactionPin) {
      return res.status(400).json("Invalid transactionPin");
    }
    // Calculate the new balances after the transfer
    const newBalanceDebit = debitUser.balance - parseFloat(amount);
    const newBalanceCredit = user.balance + parseFloat(amount);

    // Update the user's balances in the database
    debitUser.balance = newBalanceDebit;
    user.balance = newBalanceCredit;

    // Save the transaction details in the Transaction model
    const transaction = new transactionModel({
      tranType: "transfer",
      senderUserID: debitUser._id,
      senderName: debitUserName,
      senderAcctNo: debitUser.userAcctNumber,
      recipientUserID: user._id,
      recipientName: user.name,
      recipientAcctNo: user.userAcctNumber,
      amount: parseFloat(amount),
      narration: narration,
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

const userHistory = async (req, res) => {
  const { idHistory } = req.body;

  try {
    // Fetch transaction history for the user
    const transactionHistory = await transactionModel.find({
      $or: [
        { senderAcctNo: idHistory },
        { recipientAcctNo: idHistory },
      ],
    });

    res.json({ message: 'Get History Successful', transactionHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Get History Error' });
  }
};

// Node.js route to handle password reset request
const handleRequestPasswordReset = async (req, res) => {
  const { email } = req.body;
  // Validate the email address
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Generate a reset token and associate it with the user
  const resetPasswordToken = generateResetToken(32);
  const resetTokenExpires = new Date(Date.now() + 3600000); // Set expiration to 1 hour from now
  await saveResetTokenToDatabase(email, resetPasswordToken, resetTokenExpires);

  // Send an email to the user with a link containing the reset token
  sendPasswordResetEmail(email, resetPasswordToken);

  res.json({ message: 'Password reset email sent successfully.' });
};

const saveResetTokenToDatabase = async (email, resetPasswordToken, resetTokenExpires) => {
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      user.resetPasswordToken = resetPasswordToken;
      user.resetTokenExpires = resetTokenExpires;
      await user.save();
    }
  } catch (error) {
    console.error('Error saving reset token to database:', error);
    throw new Error('Failed to save reset token to database');
  }
};

function generateResetToken(length) {
  try {
    // Generate a random string
    const token = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    return token;
  } catch (error) {
    console.error('Error generating reset token:', error);
    throw new Error('Failed to generate reset token');
  }
}

// Example: Generate a random string of length 32
const randomString = generateResetToken(32);
console.log(randomString);

function sendPasswordResetEmail(email, resetPasswordToken) {
  // Configure nodemailer to send emails using your email service provider
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'acunetixtech2003@gmail.com',
      pass: 'kqtb cwxf ixee xgrn',
    },
  });

  // Compose the email
  const mailOptions = {
    from: 'acunetixtech2003@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    text: `Copy the code to reset your password ${resetPasswordToken}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const handleResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;// Assuming you send the new password in the request body

  try {
    // Validate the reset token
    const isValidToken = await validateResetToken(token);

    if (isValidToken) {
      // Find the user by the reset token
      const user = await userModel.findOne({ resetPasswordToken: token });

      if (user && user.resetTokenExpires > Date.now()) {
        // Reset token is valid, update the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = null;
        user.resetTokenExpires = null;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
      } else {
        // Invalid or expired token
        res.status(400).json({ error: 'Invalid or expired reset token' });
      }
    } else {
      // Invalid token
      res.status(400).json({ error: 'Invalid reset token' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};



// Function to validate the reset token
async function validateResetToken(token) {
  try {
    // Retrieve the user associated with the token from the database
    const user = await userModel.findOne({ resetPasswordToken: token });

    if (!user || user.resetTokenExpires < Date.now()) {
      // Invalid or expired token
      return false;
    }

    // Token is valid
    return true;
  } catch (error) {
    console.error('Error validating reset token:', error);
    throw new Error('Failed to validate reset token');
  }
}


module.exports = { registerUser, loginUser, handleRequestPasswordReset, getUserDetails, depositUser, transferUser, userHistory, handleResetPassword,};