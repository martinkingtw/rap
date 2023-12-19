import * as React from 'react'
import './App.css';


const options = [
  'Select City',
  'Barrie',
  'Belleville - Quinte West',
  'Brantford',
  'Greater Sudbury / Grand Sudbury',
  'Hamilton',
  'Kingston',
  'Kitchener - Cambridge - Waterloo',
  'London',
  'Oshawa',
  'Ottawa',
  'Peterborough',
  'St. Catharines - Niagara',
  'Toronto',
  'Windsor',
];

const currencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
  'NOK', 'SGD', 'MXN', 'INR', 'BRL', 'ZAR', 'HKD', 'DKK', 'RUB', 'KRW'
];

function App() {
  const [cityData, setCityData] = React.useState();
  const [fromCurrency, setFromCurrency] = React.useState("USD");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [amount, setAmount] = React.useState(0);
  const [exchangedAmount, setExchangedAmount] = React.useState();

  const onChangeCity = (event) => {
    fetch('http://localhost:3001/mortgage?' + new URLSearchParams({
      city: event.target.value,
    })).then(async (data) => {
      const pCityData = await data.json();
      setCityData(pCityData);
    });
  }

  return (
    <div className="App">
      <div>
        <p>City</p>
        <select
          id="city-menu"
          onChange={(event) => { onChangeCity(event) }}
        >
          {options.map((option, index) => (
            <option
              key={option}
              disabled={index === 0}
            >
              {option}
            </option>
          ))}
        </select>
        {
          cityData &&
          <>
            <p>The city is { cityData.city }</p>
            <p>The average house price is ${ cityData.averageHousePrice }</p>
            <p>A conventional 20% downpayment for the house is ${ cityData.averageHousePrice * 0.2 }</p>
            <p>The interest rate per annum as of now is around { cityData.monthlyInterest }%</p>
            <p>At the rate, the payment per month for the house is { cityData.payment }</p>

          </>
        }
      <div>

      </div>
        <p>From Currency</p>
        <select
          id="from-currency-menu"
          onChange={(event) => { setFromCurrency(event.target.value) }}
        >
          {currencies.map((option) => (
            <option
              key={option}
            >
              {option}
            </option>
          ))}
        </select>
        <p>To Currency</p>
        <select
          id="to-currency-menu"
          onChange={(event) => { setToCurrency(event.target.value) }}
        >
          {currencies.map((option) => (
            <option
              key={option}
            >
              {option}
            </option>
          ))}
        </select>
        <p>Amount</p>
        <input
          type="number"
          onInput={(event) => setAmount(event.target.value) }
        />
        <p></p>
        <button onClick={() => {
          fetch('http://localhost:3001/currency?' + new URLSearchParams({
            fromCurrency,
            toCurrency,
            amount
          })).then(async (data) => {
            const pCurrency = await data.json();
            console.log(pCurrency);
            setExchangedAmount(pCurrency.amount);
          });
        }}>
          Exchange
        </button>
        {
          exchangedAmount &&
          <p>The exchanged amount is {exchangedAmount}</p>
        }
      </div>
    </div>
  );
}

export default App;
