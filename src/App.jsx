import Header from "./Header/Header";
import Main from "./Main/Main";
import { useEffect, useState } from "react";

function App() {
  const [options, setOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [rates, setRates] = useState();
  const [amountPrimary, setAmountPrimary] = useState(1);
  const [amountSecondary, setAmountSecondary] = useState(true);

  let toAmount, fromAmount;
  if (amountSecondary) {
    fromAmount = amountPrimary;
    toAmount = amountPrimary * rates;
  } else {
    toAmount = amountPrimary;
    fromAmount = amountPrimary / rates;
  }

  const api = "https://api.exchangerate.host/latest";
  console.log(rates);

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
        const currencyArr = Object.keys(data.rates);
        setOptions([data.base, ...currencyArr]);
        setFromCurrency(data.base);
        setToCurrency(currencyArr[0]);
        setRates(Object.values(data.rates)[0]);
      });
  }, []);

  return (
    <section className="app">
      <Header></Header>
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
      >
        Pam Param
      </Main>
    </section>
  );
}

export default App;
