const { useState, useEffect } = React;
const { Dropdown } = primereact.Dropdown;

const currenciesResponse = [
  { currency: 'EUR', price: 1.08 },
  { currency: 'GBP', price: 1.32 },
  { currency: 'JPY', price: 0.0075 },
  { currency: 'AUD', price: 0.67 },
  { currency: 'CAD', price: 0.74 },
  { currency: 'INR', price: 0.012 },
  { currency: 'CNY', price: 0.14 },
  { currency: 'BRL', price: 0.19 },
  { currency: 'MXN', price: 0.053 },
  { currency: 'SAR', price: 0.27 },
  { currency: 'JPY', price: 134.25 },
  { currency: 'CHF', price: 0.91 },
  { currency: 'RUB', price: 80.00 },
  { currency: 'TRY', price: 26.75 },
  { currency: 'THB', price: 34.90 },
  { currency: 'NZD', price: 1.595 },
  { currency: 'SEK', price: 10.20 },
  { currency: 'SGD', price: 1.36 },
  { currency: 'ZAR', price: 18.50 },
  { currency: 'AED', price: 3.6725 },
  { currency: 'INR', price: 83.24 }
];

const App = () => {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [currencies, setCurrencies] = useState([]);

  // Fetch token prices from the API
  useEffect(() => {
    setCurrencies(currenciesResponse);
  }, []);

  const handleAmountChange = (e) => setAmount(e.target.value);

  // Update the exchange rate and converted amount
  const updateExchangeRate = () => {
    if (!fromCurrency?.price || !toCurrency?.price || !amount || isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }

    setErrorMessage('');

    if (fromCurrency?.price && toCurrency?.price) {
      const rate = fromCurrency.price / toCurrency.price;
      setConvertedAmount(amount * rate);
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateExchangeRate();
  };

  return (
    <div className="container">
      <h1>Currency Swap</h1>
      <form onSubmit={handleFormSubmit}>
        <div className='select-currency'>
          <div className="form-group">
            <label htmlFor="from-currency">From Currency</label>
            <div className="custom-dropdown card flex justify-content-center">
              <Dropdown
                value={fromCurrency}
                options={currencies}
                onChange={(e) => setFromCurrency(e.value)}
                optionLabel="currency"
                placeholder='Select Currency'
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="to-currency">To Currency</label>
            <div className="custom-dropdown card flex justify-content-center">
              <Dropdown
                value={toCurrency}
                options={currencies}
                onChange={(e) => setToCurrency(e.value)}
                optionLabel="currency"
                placeholder='Select Currency'
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input 
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange} 
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="error-message">
          {errorMessage && <p>{errorMessage}</p>}
        </div>

        <button type="submit">Swap</button>
      </form>

      {convertedAmount > 0 && (
        <div className="result">
          <h3>Swap Result:</h3>
          <p>{convertedAmount.toFixed(2)} {toCurrency?.currency.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

// Render the App component into the 'root' div in index.html
ReactDOM.render(<App />, document.getElementById('root'));
