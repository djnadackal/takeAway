const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Router/www.abc.com/user");

const app = express();

const url = "mongodb://localhost:27017/takeAway";
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
app.use(express.json());
try {
  con.on("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log("Error: " + error);
}

const port = 9000;
app.listen(port, () => {
  console.log("Server started");
});

app.use("/users", userRouter);
