const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

require("./mongoose");

require("./routes/apiRoutes")(app);

app.listen(1333, () => {
  console.log("App listening on port 1333");
});
