const path = require("path");
const express = require("express");
const dotenv = require("dotenv"); //for global variables
const cors = require("cors");
const parser = require("body-parser");
const storeRoute = require("./routes/storeRoutes").storeRoutes;
const mongDbConnect = require("./config/db");

//load env variables
dotenv.config({ path: "./config/config.env" }); //we will put our config file inside a folder called config we need to add object here "path" describing that.

//db connection
mongDbConnect();

const PORT = process.env.PORT || 1269;

const app = express();

app.use(cors());
app.use(parser.json());

//set static folder
app.use("/", express.static(path.join(__dirname, "public")));
//Routes
app.use("/api/stores", storeRoute);

app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});

//to run the application use command "npm run dev"s
