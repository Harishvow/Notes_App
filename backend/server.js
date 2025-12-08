import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/notes/routes.js";

import { connectDB  } from "./src/config/db.js";

import ratelimiter  from "./src/middleware/ratelimiter.js";


dotenv.config();


const app=express();
const port=process.env.PORT ||5002;
app.use(cors({
  origin: "http://localhost:5173",
}))

app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes/",routes);

app.use(express.urlencoded({ extended: true }))
connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is running", port);
  });
})
