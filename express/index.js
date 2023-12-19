const express = require("express");
const cors = require("cors");
const { mortgageRoutes } = require("./mortgage");
const { currencyRoutes } = require("./currency");

const app = express();

app.use(cors());

app.use("/mortgage", mortgageRoutes);

app.use("/currency", currencyRoutes);

app.listen(3001, () => {
  console.log("Express started on port 3001");
});