import Header from "./Header/Header";
import Main from "./Main/Main";
import { useEffect, useState } from "react";

//In API there 150+ diffrency currencies, so I decided to filtred the most intresting for me.
const favoriteCurrencyArr = [
  "EUR",
  "USD",
  "UAH",
  "PLN",
  "GBP",
  "ARS",
  "CAD",
  "KZT",
  "RON",
  "MDL",
  "THB",
];

function App() {
  const [options, setOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [rates, setRates] = useState();
  const [amountPrimary, setAmountPrimary] = useState(1);
  const [amountSecondary, setAmountSecondary] = useState(true);
  const [usdToUah, setUsdToUah] = useState();
  const [eurToUah, setEurToUah] = useState();

  let toAmount, fromAmount;
  if (amountSecondary) {
    fromAmount = financialRound(amountPrimary);
    toAmount = financialRound(amountPrimary * rates);
  } else {
    toAmount = financialRound(amountPrimary);
    fromAmount = financialRound(amountPrimary / rates);
  }

  const api = "https://api.exchangerate.host/latest";

  function financialRound(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function onChangeFromAmount(e) {
    setAmountPrimary(e.target.value);
    setAmountSecondary(true);
  }

  function onChangeToAmount(e) {
    setAmountPrimary(e.target.value);
    setAmountSecondary(false);
  }

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const filtredObj = Object.keys(data.rates)
          .filter((key) => favoriteCurrencyArr.includes(key))
          .reduce((obj, key) => {
            obj[key] = data.rates[key];
            return obj;
          }, {});
        setOptions([...Object.keys(filtredObj)]);
        const uahCurIndex = Object.keys(filtredObj).findIndex(
          (cur) => cur === "UAH"
        );
        setFromCurrency(data.base);
        setToCurrency("UAH");
        setRates(Object.values(filtredObj)[uahCurIndex]);
      });
  }, []);

  useEffect(() => {
    fetch(`${api}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates[toCurrency]));
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(`${api}?base=EUR&symbols=UAH`)
      .then((res) => res.json())
      .then((data) => setEurToUah(financialRound(data.rates["UAH"])));
    fetch(`${api}?base=USD&symbols=UAH`)
      .then((res) => res.json())
      .then((data) => setUsdToUah(financialRound(data.rates["UAH"])));
  }, []);

  return (
    <section className="app">
      <Header usdToUah={usdToUah} eurToUah={eurToUah} />
      <Main
        options={options}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        setFromCurrency={setFromCurrency}
        setToCurrency={setToCurrency}
        toAmount={toAmount}
        fromAmount={fromAmount}
        onChangeFromAmount={onChangeFromAmount}
        onChangeToAmount={onChangeToAmount}
      />
    </section>
  );
}

export default App;
