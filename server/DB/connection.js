const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mern", )
  .then(() => console.log("connection start"))
  .catch((error) => {
    console.error(error.message);
  });
