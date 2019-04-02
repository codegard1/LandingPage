import React from "react";
import * as T from "prop-types";

// Custom Stuff
import BaseComponent from "./BaseComponent";

/* StockQuote is a container that displays information for a given stock
Stock info is passed in as props from StocksContainer */
class StockQuote extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { class: "StockQuote" };

    /* bind private methods */
    this._bind("_fadeIn");
  }

  static propTypes = {
    id: T.number,
    title: T.string,
    lastTradePrice: T.string,
    change: T.number,
    changeInPercent: T.number,
    preferredName: T.string,
    symbol: T.string
  };

  /* actions to take just before the stock info is updated */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ class: "StockQuote ms-u-slideLeftOut40" });
      setTimeout(() => {
        this._fadeIn();
      }, 100);
    }
  }

  /* called immadiately after stock info changes */
  _fadeIn() {
    this.setState({ class: "StockQuote ms-u-slideLeftIn40" });
  }

  render() {
    const { preferredName, title, lastTradePrice } = { ...this.props };
    const changeInPercent =
      parseFloat(this.props.changeInPercent) <= 0 ? (
        <span className="ms-fontColor-red">
          {this.props.changeInPercent}%
          <i className="ms-Icon ms-Icon--StockDown" />
        </span>
      ) : (
        <span className="ms-fontColor-green">
          +{this.props.changeInPercent}%
          <i className="ms-Icon ms-Icon--StockUp" />
        </span>
      );
    const gLink = `https://www.google.com/finance?q=${this.props.symbol}`;

    return (
      <div className={this.state.class}>
        <span className="ms-font-m">
          <a href={gLink} rel="noopener noreferrer" target="_blank">
            {preferredName} ({title})
          </a>
        </span>
        <br />
        <span className="ms-font-s" style={{ float: "left" }}>
          ${lastTradePrice}
        </span>
        <span className="ms-font-s" style={{ float: "right" }}>
          {changeInPercent}
          <a title="Notice: This may not be the latest quote. Please click the link at left to see the most up-to-date information.">*</a>
        </span>
        <br />
      </div>
    );
  }
}

export default StockQuote;
