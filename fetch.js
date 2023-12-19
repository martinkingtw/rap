const fs = require('fs');

async function nearestBank(postcode) {
  const data = fs.readFileSync('./bank.csv', 'utf-8');
  const bankRows = data.split('\n');
  const formatBanks = bankRows.map((b) => b.split(','));
  const banks = formatBanks.filter((b) => b[0] === postcode);
  console.log(banks);
}

nearestBank("M3J 1P3");