import { User } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign(
    { id }, //! id : id (Payload)
    process.env.SECRET_KEY,
    {
      expiresIn: maxAge,
    }
  );
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err._message == "User validation failed") {
    errors.email = " Email & Password compulsory";
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  } else {
    errors.email = "Something Went Wrong!! Try Again"; 
  }

  return errors;
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });
    // console.log(user)  //! database mai jaise save hota vaise user ko mila to _id hai
    const token = createToken(user._id);
    console.log(token)

    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ user: user._id, created: true }); //! 201 --> Created
  } catch (error) {
    console.log(error);

    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);
    // console.log(user)  //! database mai jaise save hota vaise user ko mila to _id hai
    const token = createToken(user._id);
    // console.log(token)

    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({ user: user._id, created: true });
  } catch (error) {
    console.log(error);

    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

export { register };
