import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";



dotenv.config({
  path : "/.env"
});
const app = express();
const port = process.env.PORT || 5000;


const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
};

// app.use(
//   cors({
//     origin:process.env.CORS_ORIGIN,      // ["http://localhost:3000"]
//     methods: ["GET", "POST"],
//     withCredentials: true,
//   })
// );

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
// app.use(urlencoded({extended : true}))

import authRoutes from "./Routes/AuthRoutes.js"

app.use("/users",authRoutes);


/**
 * ! Since ConnectDB() is a async function it will return promise
 *
 */

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });

  app.on("error",(error,req,res)=>{
    console.log("ERROR :" , error)
  })
})
.catch((err)=>{
    console.log("MongoDB connection Failed" , err);
})




// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port:${port}`);
// });
