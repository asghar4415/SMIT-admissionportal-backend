import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router/index.js";
import 'dotenv/config';
import userModel from "./models/userSchema.js";

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://cadet1418:hHCb6mN8BWmoFqB8@smit-admissionportal.09yzg.mongodb.net/";

mongoose.connect(uri);
mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", (err) => console.log("Error connecting to DB:", err));

app.use(router);

app.get("/", (req, res) => {
  res.json("Running");
});

app.post('/updateUserData', async (req, res) => {
  try {
    const { email, ...updatedData } = req.body;
    const user = await userModel.findOneAndUpdate({ email }, updatedData, { new: true });
    if (user) {
      res.status(200).json({ message: 'Profile updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
