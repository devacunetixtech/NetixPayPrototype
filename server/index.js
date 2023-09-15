const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute")

const app = express();
require("dotenv").config()

app.use(express.json());    
app.use(cors({
    origin:["https://localhost:3000", "https://netix-pay-prot.onrender.com"],
}));
app.use("/api/users", userRoute);

app.get("/", (req, res)=>{
    res.send("Welcome to MERN STACK")
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`);
})
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB Connection Established"))
.catch((error)=>console.log("MongoDB Connection Failed: ", error.message))