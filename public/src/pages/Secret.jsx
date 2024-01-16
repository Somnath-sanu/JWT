import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer  , toast } from 'react-toastify';
import {CookiesProvider, useCookies} from "react-cookie"
import axios from 'axios';

const Secret = () => {
  const navigate = useNavigate();

  const [cookies, setCookie , removeCookie] = useCookies([])
  console.log(cookies)

  useEffect(()=>{
    const verifyUser = async () => {
      if(!cookies.registered){
        toast("You need to log in to access the secret page.", { theme: "dark" });
        navigate("/login");
      }
      else{
        const {data} = await axios.post("http://localhost:5000/users",{},{withCredentials : true})
        console.log(data.status)
        if(!data.status){
          removeCookie("jwt")
          // navigate("/login")

        }else{
          toast(`HI ${data.user}` , {theme : "dark"})
        }
      }
    }

    verifyUser();
  } , [cookies, navigate , removeCookie])

  const logOut = ()=>{
    removeCookie("jwt")
    navigate("/register")
  }
  return (
    <CookiesProvider>
      <div className='private'>
      <h1>Secret page</h1>
      <button onClick={logOut}>Log out</button>

    </div>
      <ToastContainer/>
    </CookiesProvider>
  )
}

export default Secret
