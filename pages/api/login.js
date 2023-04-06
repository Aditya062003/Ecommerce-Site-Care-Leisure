import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require('crypto-js')
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    var bytes  = CryptoJS.AES.decrypt(user.password, 'secret123');
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass){
          var token = jwt.sign({ email: user.email, name: user.name }, 'aditya',{expiresIn:'1d'});
          res.status(200).json({success: true,token,email:user.email});
        } 
        else {
          res.status(400).json({ success: false, error: "Invalid Credentials" });
        }
    }else {
        res.status(400).json({ success: false, error: "User not found!" });
      }
} 
};

export default connectDb(handler);
