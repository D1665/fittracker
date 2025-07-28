import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/user/", UserRoutes);
// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});


app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from FitTracker API",
  });
});
app.use(express.static(path.join(__dirname, "client/public")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client","public", "index.html"));
});



// const MONGODB_URI = "mongodb+srv://rahul:test123@cluster0.mongodb.net/gfgDB";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI, );
    console.log("✓ MongoDB connected");
  } catch (err) {
    console.error("✗ MongoDB connection failed");
    console.error(err);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8008, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};


startServer();