import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <h2 className="header-title">Currency Convertor</h2>
        <div className="currency-header">
          <h4 className="title-currency">Current currency rate</h4>
          <ul className="currency-list">
            <li className="currency-pair">
              <span className="currency-1st">1 USD</span>
              <i className="fa-sharp fa-solid fa-equals"></i>
              <span className="currency-2nd">40 UAH</span>
            </li>
            <li className="currency-pair">
              <span className="currency-1st">1 EUR</span>
              <i className="fa-sharp fa-solid fa-equals"></i>{" "}
              <span className="currency-2nd">42 UAH</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
