import React from "react";
import styles from "./CurrencyItem.module.scss";

function CurrencyItem({
  options,
  defaultCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) {
  return (
    <div className={styles.item}>
      <select
        className={styles.select}
        value={defaultCurrency}
        onChange={onChangeCurrency}
      >
        {options.map((i) => {
          return (
            <option key={i} value={i} className={styles.option}>
              {i}
            </option>
          );
        })}
      </select>
      <input
        pattern="\d*"
        maxLength="100000"
        className={styles.input}
        value={amount}
        onChange={onChangeAmount}
      />
    </div>
  );
}

export default CurrencyItem;
