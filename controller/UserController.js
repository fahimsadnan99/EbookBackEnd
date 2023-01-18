const UserSchema = require('../model/UserModel')
const bcrypt = require("bcrypt");


const signup = async (req, res) => {
    const { name ,email, password } = req.body;
    
    let User = await UserSchema.findOne({ email: email });
  
    if (User) {

      return res.status(400).json({message : "User Already Exist"});
    }
  
    User = new UserSchema({
        name: name,
        email: email,
        password : password
    });

    User.password = await bcrypt.hash(password, 10)
    const Token = await User.generateJWT();
  
    try {
     await User.save();
    return res.status(201).send({
      message: "User Registration Successfull",
      Token: Token,
    });
    } catch (err) {
    return res.status(400).send(err.message);
   }
    
  };




  const signin = async (req, res) => {

    console.log(req.body);
    const AuthUser = await UserSchema.findOne({ email: req.body.email });
    if (!AuthUser) return res.status(400).json({message : "User Not Exist"});
  
    const PassComp = await bcrypt.compare(req.body.password, AuthUser.password);
    if (!PassComp) return res.status(400).send("Email OR Password Wrong..");
    const Token = await AuthUser.generateJWT();
    try {
      res.status(200).send({
      message: "Login Successfull",
      Token: Token,

    });
    } catch (err) {
      return res.status(400).send("Invalid information")
    }
    
  };
  
  
  const allUsers = async (req, res) => {
   
    try{
      const allUser = await UserSchema.find({})
 
      res.status(200).send(allUser)
    }catch (err) {
      return res.status(400).send("Server Error")
    }
  }
  
  module.exports = { signin, signup ,allUsers};