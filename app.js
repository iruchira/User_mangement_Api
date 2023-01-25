const express = require ("express");
const app = express();
var cors =require("cors");
const userRoutes= require("./Routes/userRoutes")
app.use(cors());
const bodyParser = require("body-parser");
const Port =3000;
app.use(bodyParser.json());
app.use(express.urlencoded());

app.use("/user", userRoutes);
app.listen(Port,() => console.log("API server is running...."));