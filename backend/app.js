const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//Routes
const authRoutes = require("./routes/auth");

const app = express();

//db -> 23CZ3foMoJSRVuhF
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch((err) => console.log("DB CONNECTION ERR", err));

//middlewares
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use(cors());

//routes middleware
app.use("/api", authRoutes);

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
