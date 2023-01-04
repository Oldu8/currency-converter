import Header from "./Header/Header";
import Main from "./Main/Main";
import { useEffect, useState } from "react";

function App() {
  const [options, setOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");
  // const [amountPrimary, setAmountPrimary] = useState(1);
  // const [amountSecondary, setAmountSecondary] = useState(true);

  const api = "https://api.exchangerate.host/latest";
  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setOptions([data.base, ...Object.keys(data.rates)]));
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
      >
        Pam Param
      </Main>
    </section>
  );
}

export default App;
