import React from "react";
import styles from "./Main.module.css";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import rotateSolid from "../assets/rotateSolid.svg";
import currencyIcon from "../assets/currencyIcon.svg";

function main({
  options,
  toCurrency,
  fromCurrency,
  setFromCurrency,
  setToCurrency,
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
            />
            <span className={styles.equal}>
              <img src={rotateSolid} />
            </span>
            <CurrencyItem
              options={options}
              defaultCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default main;
