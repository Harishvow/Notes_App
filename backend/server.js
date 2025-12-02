import express, { Router } from "express";
import routes from "./src/notes/routes.js";

import { connectDB  } from "./src/config/db.js";
import dotenv from "dotenv";
import ratelimiter  from "./src/middleware/ratelimiter.js";

dotenv.config();


const app=express();
const port=process.env.PORT ||5003;

app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes/",routes);

app.use(express.urlencoded({ extended: true }))
connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is running", port);
  });
})
