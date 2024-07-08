import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router/index.js"; 
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.9";


mongoose.connect(uri);
mongoose.connection.on("connected",()=>console.log("mongoDb connected"));
mongoose.connection.on("error",()=>console.log("error connecting to db"))
app.use(router); 

app.get("/", (req, res) => {
    res.json("Running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
