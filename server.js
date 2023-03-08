const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

app.use("/", userRoute);
app.use("/",adminRoute);

app.listen(4000);