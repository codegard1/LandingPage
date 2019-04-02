import React from "react";
import * as T from "prop-types";

// Custom Stuff
import BaseComponent from "../BaseComponent";

// render an individual list item for the Table of Contents
class TOCItem extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = { selected: false };

    /* bind private methods */
    this._bind("_handleClick");
  }

  static propTypes = {
    id: T.number.isRequired,
    title: T.string.isRequired,
    loadMessage: T.func
  };

  _handleClick() {
    this.props.loadMessage(this.props.id);
  }

  render() {
    const id = this.props.id;
    const title = this.props.title;
    const messageTitleClassName = this.props.selected
      ? "ms-font-m toc-item selected"
      : "ms-font-m toc-item";

    return (
      <span key={`pbthread-toc-${id}`} className={messageTitleClassName}>
        <a onClick={this._handleClick}>{title}</a>
      </span>
    );
  }
}

export default TOCItem;
