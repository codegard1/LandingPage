import React, { Component } from "react";
import * as T from "prop-types";
import { Link } from "office-ui-fabric-react/lib/Link";
import moment from "moment";
import ContentMember from "./ContentMember";

import "./Greeting.css";

/* Greeting displays a welcome message and the current date */
class Greeting extends Component {
  static propTypes = {
    displayName: T.string,
    _showFeedbackPanel: T.func,
    isFeedbackPanelVisible: T.bool
  };

  render() {
    const date = moment().format("ddd MMM Do, YYYY");
    const displayName = this.props.displayName ? `, ${this.props.displayName}` : "";

    return (
      <ContentMember id="Greeting">
        <span className="ms-font-xxl">{`Hello${displayName}!`}</span>
        <span className="ms-font-xl greeting-date">{date}</span>
        <hr />
        <span className="ms-font-l">
          Having Issues? Want to provide feedback? Click{" "}
          <Link onClick={this.props._showFeedbackPanel} href="#">
            here
          </Link>{" "}
          to share your comments.
        </span>
      </ContentMember>
    );
  }
}

export default Greeting;
