import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // console.log(values)

  const generateError = (err) => {
    return toast.error(err, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    // console.log(e)
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/users/login",
        {
          ...values,
        }
      );

      console.log(data); //! response.data = {data}
      if (data) {
        /**
         * ! backend(server) se jo bhi response(res) aayega
         * ! wo axios ke {data} mai jaayega
         */
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("ERROR :", error);
    }
  };

  return (
    <div className="container">
      <h2>Login Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
