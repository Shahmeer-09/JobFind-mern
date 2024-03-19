require("dotenv").config();
const connectDb = require("./config/connectdb");
const express = require("express");
const { errorHandlermiddlerware } = require("./middlewares/ErrorManager");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const cloudinary = require("cloudinary").v2;
app.use(morgan("tiny"));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret:  process.env.CLOUD_API_SECRET,
});
app.use(cors());
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());
app.use("/api/jm/jobs", require("./routes/jobRoutes"));
app.use("/api/jm/auth", require("./routes/authRoutes"));
app.use("/api/jm/user", require("./routes/userRoutes"));

app.use("*", (req, res) => {
  res.status(404).json({ msg: "route not found" });
});
app.use(errorHandlermiddlerware);

const port = process.env.PORT || 5100;
try {
  connectDb();
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
