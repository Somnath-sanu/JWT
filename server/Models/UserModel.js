import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

//! new mongoose.Schema({})  --> new Schema({})

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
});

//! pre -> hook in mongoose give access to this

userSchema.pre("save", async function (next) {
  // if(!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  //! email : email
   //! email : tillu@gmail.com -> this points model(User.findone)
  if (user) {
    const auth = await bcrypt.compare(password, user.password); //! return true or false
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

// ! if you use next() -> then dont use await before bcrypt.hash...
// ! if use await then no need for next()

export const User = mongoose.model("User", userSchema);

// ! export {User}
