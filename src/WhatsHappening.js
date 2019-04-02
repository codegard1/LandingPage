import React from "react";
import * as T from "prop-types";
import { List } from "office-ui-fabric-react/lib/List";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";

/* Custom Stuff */
import "./WhatsHappening.css";
import ContentMember from "./ContentMember";
import BaseComponent from "./BaseComponent";
import ItemCell from "./WHItemCell";

/* WhatsHappening retreives data from SharePoint and passes it to a Fabric List as props
Each item in the List is rendered as an instance of ItemCell (WHItemCell) */
class WhatsHappening extends BaseComponent {
  static propTypes = {
    data: T.object
  };

  render() {
    const listItems = this.props.data
      ? this.props.data.d.results.slice(0, 4)
      : undefined;

    return (
      <ContentMember
        id="WhatsHappening"
        icon="News"
        title="What's Happening at PB"
      >
        {!listItems && (
          <div className="mocka-container">
            <span className="mocka-media" />
            <span className="mocka-heading" />
            <span className="mocka-text" />
            <span className="mocka-text" />
          </div>
        )}
        {listItems && (
          <FocusZone direction={FocusZoneDirection.vertical}>
            <List
              items={listItems}
              onRenderCell={(item, index) => (
                <ItemCell item={item} key={index} />
              )}
            />
          </FocusZone>
        )}
      </ContentMember>
    );
  }
}

export default WhatsHappening;
