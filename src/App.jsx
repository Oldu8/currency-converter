import Header from "./Header/Header";
import Main from "./Main/Main";
import { useEffect, useState } from "react";
import { favoriteCurrencyArr } from "./assets/favoireteCurrencyArr";
import {
  numberFormat,
  financialRound,
  onChangeFromAmount,
  onChangeToAmount,
} from "./services/functions";

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
    fromAmount = numberFormat(amountPrimary);
    toAmount = numberFormat(amountPrimary * rates);
  } else {
    toAmount = numberFormat(amountPrimary);
    fromAmount = numberFormat(amountPrimary / rates);
  }

  const api = "https://api.exchangerate.host/latest";
  const base_url = "https://api.exchangerate.host/convert";

  useEffect(() => {
    fetch(`${base_url}?from=EUR&to=UAH`)
      .then((res) => res.json())
      .then((data) => setEurToUah(financialRound(data.info.rate)));
    fetch(`${base_url}?from=USD&to=UAH`)
      .then((res) => res.json())
      .then((data) => setUsdToUah(financialRound(data.info.rate)));

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
    fetch(`${base_url}?from=${fromCurrency}&to=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => setRates(data.info.rate));
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
