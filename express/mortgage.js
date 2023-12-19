const express = require("express");
const fs = require("fs");

const mortgageRoutes = express.Router();

mortgageRoutes.get("/", async (req, res) => {
  const terms = 25 * 12;
  const housePrice = (await fs.readFileSync('../housePrice.csv', 'utf-8')).split('\n').map((b) => b.split(',')).filter((i) => i[0] === req.query.city);
  if (housePrice.length === 0) { console.error("Cannot find city"); return res.status(500).send({ err: "Cannot find city" });; }
  const averageHousePrice = Number(housePrice[0][6]);
  const interestRates = await (await fetch('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date')).text();
  const rates = JSON.parse(interestRates).data.filter((i) => i.security_desc === 'Treasury Bonds').slice(-1)[0];
  const monthlyInterest = (Number(rates.avg_interest_rate_amt) + 3) / (12 * 100);
  const payment = averageHousePrice * 0.8 * (monthlyInterest * ((1 + monthlyInterest) ** terms)) / ((1 + monthlyInterest) ** terms - 1);
  console.log(`The average house price in ${req.query.city} is $${averageHousePrice}`);
  console.log(`A 20% down payment will cost $${(averageHousePrice * 0.2).toFixed(2)}`);
  console.log(`The interest per annum is ${(monthlyInterest * 1200).toFixed(2)}%`);
  console.log(`With a 25 years mortgage, the monthly payment is $${payment.toFixed(2)}`);
  return res.send({ city: req.query.city, averageHousePrice, monthlyInterest: (monthlyInterest * 1200).toFixed(2), payment: payment.toFixed(2) });
});

module.exports = { mortgageRoutes };