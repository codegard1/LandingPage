import React from "react";
import * as T from "prop-types";

/* Custom Stuff */
import BaseComponent from "./BaseComponent";

/* ItemCell renders a single list item, passed as props from WhatsHappening */
class ItemCell extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isBodyVisible: false
    };

    /* bind private methods */
    this._bind("_onClickTitle", "_toggleVisibility");
  }

  static propTypes = {
    item: T.object,
    index: T.number
  };

  /* called when the item title is clicked */
  _onClickTitle() {
    if (this.state.isBodyVisible) {
      this._itemBody.className =
        "fabricList-itemBody ms-font-xs ms-u-slideUpOut10";
      setTimeout(this._toggleVisibility, 200);
    } else {
      this._toggleVisibility();
    }
  }

  /* hide the item's body */
  _toggleVisibility() {
    this.setState({
      isBodyVisible: !this.state.isBodyVisible
    });
  }

  render() {
    const { item, index } = { ...this.props };
    const bodyClass = "fabricList-itemBody ms-font-xs ms-u-slideDownIn10";

    return (
      <div
        className="fabricList-itemCell"
        data-is-focusable
        key={`WhatsHappening_ItemCell-${index}`}
      >
        <div className="fabricList-itemContainer">
          <div className="fabricList-itemTitle" onClick={this._onClickTitle}>
            <span className="ms-font-s ms-fontColor-red">
              <i className="ms-Icon ms-Icon--FavoriteStarFill" aria-hidden />
              &nbsp;
            </span>
            <span className="ms-font-m">{item.Title}</span>
          </div>

          {this.state.isBodyVisible && (
            <div
              className={bodyClass}
              ref={itemBody => (this._itemBody = itemBody)}
              dangerouslySetInnerHTML={{ __html: item.Body }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ItemCell;
