const fs = require('fs');

async function mortgageCalc(area) {
  const terms = 25 * 12;
  const housePrice = (await fs.readFileSync('./housePrice.csv', 'utf-8')).split('\n').map((b) => b.split(',')).filter((i) => i[0] === area);
  if (housePrice.length === 0) { console.error("Cannot find city"); return; }
  const averageHousePrice = Number(housePrice[0][6]);
  const interestRates = await (await fetch('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date')).text();
  const rates = JSON.parse(interestRates).data.filter((i) => i.security_desc === 'Treasury Bonds').slice(-1)[0];
  const monthlyInterest = (Number(rates.avg_interest_rate_amt) + 3) / (12 * 100);
  const payment = averageHousePrice * 0.8 * (monthlyInterest * ((1 + monthlyInterest) ** terms)) / ((1 + monthlyInterest) ** terms - 1);
  console.log(`The average house price in ${area} is $${averageHousePrice}`);
  console.log(`A 20% down payment will cost $${(averageHousePrice * 0.2).toFixed(2)}`);
  console.log(`The interest per annum is ${(monthlyInterest * 1200).toFixed(2)}%`);
  console.log(`With a 25 years mortgage, the monthly payment is $${payment.toFixed(2)}`);
  return;
}

mortgageCalc("Toronto");

// How much house can I afford
// Downpayment & Payment v.s. Rent
// Bank of Canada API
// Financial Planner
// Budgeting app
