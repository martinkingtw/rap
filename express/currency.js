const express = require("express");

const currencyRoutes = express.Router();

currencyRoutes.get("/", async (req, res) => {
    const amount = req.query.amount;
    const fromCurrency = req.query.fromCurrency;
    const toCurrency = req.query.toCurrency;

    var myHeaders = new Headers();
    myHeaders.append("apikey", "HKvssZusNoH0Es2J9POnHZgiedxa63hH");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
  
    try {
        fetch(`https://api.apilayer.com/fixer/latest?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result);
            return res.send({ amount: JSON.parse(result).rates[toCurrency] * amount });
          } )
          .catch(error => res.status(500).send({ err: error.message }));
    } catch (error) {
        console.error('Error during currency conversion:', error.message);
        return res.status(500).send({ err: error.message });
    }
});

module.exports = { currencyRoutes };