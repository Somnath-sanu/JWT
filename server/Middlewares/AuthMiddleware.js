//! we need model and jwt

import { User } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token) //!  undefined
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      }
      else{
        const user = await User.findById(decodedToken.id)
        if(user) res.json({status : true , user : user.email})
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};



export {checkUser}