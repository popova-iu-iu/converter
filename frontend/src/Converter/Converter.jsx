import React, { useState, useEffect } from "react";
import axios from "axios";

import { BiRevision } from "react-icons/bi";
import Dropdown from "../components/Dropdown";

const Converter = () => {
  const values = ["RUB", "EUR", "USD"];

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("RUB");
  const [exchangeRate, setExchangeRate] = useState();
  const [result, setResult] = useState('Result will be here!');

  useEffect(() => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(({ data }) => {
        setExchangeRate(data.rates[toCurrency]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fromCurrency, toCurrency]);

  const handleAmount = (value) => {
    setAmount(value.target.value);
  };

  const handleFrom = (value) => {
    setFromCurrency(value.target.value);
  };

  const handleTo = (value) => {
    setToCurrency(value.target.value);
  };

  const getResult = (e) => {
    e.preventDefault();
    setResult((amount * exchangeRate).toFixed(2));
  };

  const getDefault = (e) => {
    e.preventDefault();
    setAmount(1);
    setFromCurrency('RUB');
    setToCurrency('RUB');
    setResult('Result will be here!');
  }

  return (
    <div className="container">
      <h1>Converter</h1>
      <section>
        <form className="form">
          <div className="input-box">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className=""
              placeholder="Enter amount"
              onChange={(e) => handleAmount(e)}
              value={amount}
            />
          </div>

          <div className="column">
            <Dropdown values={values} label="from" onChange={handleFrom} />
            <Dropdown values={values} label="to" onChange={handleTo} />
          </div>

          <button className="btn primary" onClick={getResult}>
            Convert
          </button>

          <button className="btn secondary center" onClick={getDefault}>
            <BiRevision size={20} />
            <span>Reset</span>
          </button>
        </form>
        <div className="result">{result}</div>
      </section>
    </div>
  );
};

export default Converter;
