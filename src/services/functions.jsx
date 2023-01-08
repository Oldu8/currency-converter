import { favoriteCurrencyArr } from "../assets/favoireteCurrencyArr";

export function financialRound(x) {
  return Number.parseFloat(x).toFixed(2);
}

const api = "https://api.exchangerate.host/latest";

export async function getCurrencyObj() {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      const filtredObj = Object.keys(data.rates)
        .filter((key) => favoriteCurrencyArr.includes(key))
        .reduce((obj, key) => {
          obj[key] = data.rates[key];
          return obj;
        }, {});
      return [...Object.keys(filtredObj)];
    });
}
