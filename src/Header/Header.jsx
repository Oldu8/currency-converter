import React from "react";
import styles from "./Header.module.scss";

function Header({ usdToUah, eurToUah }) {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Currency Convertor</h2>
        <div className={styles.currencyHeader}>
          <h4 className={styles.titleCurrency}>Current currency rate</h4>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span className={styles.currency}>1 USD</span>
              <i className="fa-sharp fa-solid fa-equals"></i>
              <span className={styles.currencyEqual}>{usdToUah} UAH</span>
            </li>
            <li className={styles.item}>
              <span className={styles.currency}>1 EUR</span>
              <i className="fa-sharp fa-solid fa-equals"></i>
              <span className={styles.currencyEqual}>{eurToUah} UAH</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
