import React, { Component } from "react";
import { Link } from "office-ui-fabric-react/lib/Link";
import { List } from "office-ui-fabric-react/lib/List";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";

/* custom stuff */
import ContentMember from "./ContentMember";
import './FormsList.css';

class FormsList extends Component {
  render() {
    const listData = this.props.listData;

    return (
      <ContentMember id="FormsList" title="Forms" icon="FormLibrary">
        {!listData && (
          <div className="mocka-container">
            <span className="mocka-media" />
            <span className="mocka-heading" />
            <span className="mocka-text" />
            <span className="mocka-text" />
          </div>
        )}
        {listData && (
          <FocusZone direction={FocusZoneDirection.vertical}>
            <List
              items={listData.d.results}
              onRenderCell={item => (
                <Link target="_blank" href={item.eFormInitiationPageUrl.Url} title={item.CategoryDescription}>
                  &nbsp;{item.Title}
                </Link>
              )}
            />
          </FocusZone>
        )}
      </ContentMember>
    );
  }
}

export default FormsList;
