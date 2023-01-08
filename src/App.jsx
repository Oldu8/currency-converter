import Header from "./Header/Header";
import Main from "./Main/Main";
import { useEffect, useState } from "react";
import { favoriteCurrencyArr } from "./assets/favoireteCurrencyArr";
import { financialRound } from "./services/functions";

function App() {
  const [options, setOptions] = useState(favoriteCurrencyArr);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [rates, setRates] = useState();
  const [amountPrimary, setAmountPrimary] = useState(1);
  const [amountSecondary, setAmountSecondary] = useState(true);
  const [usdToUah, setUsdToUah] = useState();
  const [eurToUah, setEurToUah] = useState();

  let toAmount, fromAmount;
  if (amountSecondary) {
    fromAmount = amountPrimary;
    toAmount = financialRound(amountPrimary * rates);
  } else {
    toAmount = amountPrimary;
    fromAmount = financialRound(amountPrimary / rates);
  }

  const base_url = "https://api.exchangerate.host/convert";

  function onChangeFromAmount(e) {
    setAmountPrimary(e.target.value);
    setAmountSecondary(true);
  }

  function onChangeToAmount(e) {
    setAmountPrimary(e.target.value);
    setAmountSecondary(false);
  }

  useEffect(() => {
    fetch(`${base_url}?from=EUR&to=UAH`)
      .then((res) => res.json())
      .then((data) => {
        setEurToUah(financialRound(data.info.rate));
        setRates(financialRound(data.info.rate));
      });
    fetch(`${base_url}?from=USD&to=UAH`)
      .then((res) => res.json())
      .then((data) => setUsdToUah(financialRound(data.info.rate)));
  }, []);

  useEffect(() => {
    fetch(`${base_url}?from=${fromCurrency}&to=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => setRates(financialRound(data.info.rate)));
  }, [fromCurrency, toCurrency]);

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
