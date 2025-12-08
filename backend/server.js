import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/notes/routes.js";

import { connectDB  } from "./src/config/db.js";

import ratelimiter  from "./src/middleware/ratelimiter.js";
import path from "path"


dotenv.config();


const app=express();
const port=process.env.PORT ||5002;
const __dirname=path.resolve();
if(process.env.NODE_ENV!="production"){
app.use(cors({
  origin: "http://localhost:5173",
}))}

app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes/",routes);
if(process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})}

app.use(express.urlencoded({ extended: true }))
connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is running", port);
  });
})
