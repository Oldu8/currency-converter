import React from "react";
import CurrencySwap from "../CurrencySwap/CurrencySwap";
import styles from "./Main.module.css";

function main({ options, fromCurrency, setFromCurrency, setToCurrency }) {
  return (
    <section className="main">
      <section className={styles.wrapper}>
        <CurrencySwap
          options={options}
          fromCurrency={fromCurrency}
          setFromCurrency={setFromCurrency}
          setToCurrency={setToCurrency}
        />
      </section>
    </section>
  );
}

export default main;
