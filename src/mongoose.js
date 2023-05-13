const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Ecommerce_user:Rajpur2026@everyneedsfound.77luk.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
