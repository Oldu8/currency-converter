import React from "react";
import styles from "./Main.module.scss";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import currencyIcon from "../assets/currencyIcon.svg";

function main({
  options,
  toCurrency,
  fromCurrency,
  setFromCurrency,
  setToCurrency,
  toAmount,
  fromAmount,
  onChangeFromAmount,
  onChangeToAmount,
}) {
  return (
    <section className="main">
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <h2 className={styles.title}>
            <img src={currencyIcon} className={styles.currencyIcon} />
            Convertor
          </h2>
          <div className={styles.swapWindow}>
            <CurrencyItem
              options={options}
              defaultCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
              amount={fromAmount}
              onChangeAmount={onChangeFromAmount}
            />
            <span className={styles.equal}>=</span>
            <CurrencyItem
              options={options}
              defaultCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
              amount={toAmount}
              onChangeAmount={onChangeToAmount}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default main;
