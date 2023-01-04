import React from "react";
import styles from "./CurrencySwap.module.css";
import CurrencyRow from "./CurrencyRow/CurrencyRow";

function CurrencySwap({
  options,
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
}) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <i className="fa-regular fa-coins"></i>Convert
      </h2>
      <div className={styles.container}>
        <CurrencyRow
          options={options}
          defaultCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        />
        <span className={styles.equal}>=</span>
        <CurrencyRow
          options={options}
          defaultCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CurrencySwap;
