import React from "react";
import * as T from "prop-types";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

/* Custom Stuff */
import "./StocksContainer.css";
import StockQuote from "./StockQuote";
import BaseComponent from "./BaseComponent";

/* StocksContainer retreives data from SharePoint and passes it to StockQuote as props
StocksContainer updates the props it sends to StockQuote at a regular interval set in _swapQuote() */
export class StocksContainer extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isTimedOut: false,
      swapInterval: 5000
    };

    /* bind private methods */
    this._bind("_spinnerTimeout", "_swapQuote");
  }

  static propTypes = {
    listData: T.object
  };

  static defaultProps = {
    listData: undefined
  };

  /* Update props sent to StockQuote and reset the timer  */
  componentWillReceiveProps(nextProps) {
    if (this.props.listData !== nextProps.listData) {
      this._swapQuote();
    }
  }

  /* deprecated: hide the Spinner if list data doesn't load after 5 seconds */
  _spinnerTimeout() {
    setTimeout(() => {
      if (!this.props.listData) {
        this.setState({ isTimedOut: true });
      } else {
        this._spinnerTimeout();
      }
    }, 5000);
  }

  /* every 5 seconds, update the index and send new props to StockQuote */
  _swapQuote() {
    setInterval(() => {
      const newIndex =
        this.state.index + 1 >= this.props.listData.d.results.length
          ? 0
          : this.state.index + 1;
      this.setState({ index: newIndex });
    }, this.state.swapInterval);
  }

  render() {
    const item = this.props.listData
      ? this.props.listData.d.results[this.state.index]
      : undefined;
    const stockQuote = item ? (
      <StockQuote
        id={item.Id}
        title={item.Title}
        lastTradePrice={item.LastTradePrice}
        change={item.Change}
        changeInPercent={item.ChangeInPercent}
        preferredName={item.PreferredName}
        symbol={item.Symbol}
      />
    ) : (
      undefined
    );

    return (
      <div id="StocksContainer">
        {stockQuote && stockQuote}
        {!stockQuote &&
        !this.state.isTimedOut && <Spinner size={SpinnerSize.xSmall} />}
      </div>
    );
  }
}

export default StocksContainer;
