import React from "react";
import * as T from "prop-types";
import { List } from "office-ui-fabric-react/lib/List";
import moment from "moment";

// Custom stuff
import TOCItem from "./TOCItem";
import BaseComponent from "../BaseComponent";

class TableOfContents extends BaseComponent {
  constructor(props) {
    super(props);

    /* bind private methods */
    this._bind("_renderTocItem");
  }

  static propTypes = {
    messages: T.array.isRequired,
    loadMessage: T.func
  };

  // render a list item in the Table of Contents
  _renderTocItem(item) {
    return (
      <TOCItem
        id={item.ID}
        title={item.Title}
        selected={item.selected}
        loadMessage={this.props.loadMessage}
      />
    );
  }

  render() {
    const today = moment().format("MMM Do, YYYY");

    return (
      <div id="PBThread-TOC">
        <span className="ms-font-xl">Messages for {today}</span>
        <List items={this.props.messages} onRenderCell={this._renderTocItem} />
      </div>
    );
  }
}

export default TableOfContents;
