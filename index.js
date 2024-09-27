const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const dbConnect = require("./config");
const userData = require("./content");

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// //  Data base connection
dbConnect();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });


app.post('/signup', async (req,res) => {
    try {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
          return res.status(400).send({
            message: "The credentials are incomplete.",
            success: false,
          });
        }
    
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.status(409).send({
            message: "User already exists.",
            success: false,
          });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new UserModel({
          name,
          email,
          password: hashedPassword,
        });
    
        await newUser.save();
    
        // Create and save Customer document if the role is 'Customer'
        let newCustomer;
       
          newCustomer = new userData({
            name,
            email,
            password
          });
    
          await newCustomer.save();
    
        return res.status(201).send({
          message: "User registered successfully.",
          success: true,
          newCustomer,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          message: "Internal server error.",
          success: false,
        });
      }
})  

app.get('/login', async (req,res)=>{
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).send({
            message: "The credentials are incomplete.",
            success: false,
          });
        }
    
        const existingUser = await UserModel.findOne({ email });
    
        if (!existingUser) {
          return res.status(401).send({
            message: "The credentials are incorrect.",
            success: false,
          });
        }
    
        const id = existingUser._id;
    
        const customer = await CustomerModel.findOne({ userID: id });
    
        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser.password
        );
    
        if (!isPasswordValid) {
          return res.status(401).send({
            message: "The credentials are incorrect.",
            success: false,
          });
        }
    
        const { _id } = customer;
    
        return res.status(200).send({
          message: "Login successful.",
          success: true,
          user: existingUser,
          CustomerId: _id,
          role: "Customer",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Internal server error.",
          success: false,
        });
      }


})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
