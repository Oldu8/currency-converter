import React from "react";
import styles from "./CurrencyItem.module.css";

function CurrencyItem({ options, defaultCurrency, onChangeCurrency }) {
  return (
    <div className={styles.item}>
      <select
        className={styles.select}
        value={defaultCurrency}
        onChange={onChangeCurrency}
      >
        {options.map((i) => {
          return (
            <option key={i} value={i}>
              {i}
            </option>
          );
        })}
      </select>
      <input type="number" className={styles.input} />
    </div>
  );
}

export default CurrencyItem;