import React, { Component } from "react";
import * as T from "prop-types";
import { Link } from "office-ui-fabric-react/lib/Link";
import Masonry from "react-masonry-component";
import ContentMember from "./ContentMember";

/* Custom Stuff */
import "./MasonryContainer.css";

/* MasonryContainer holds a collection of Icons used as links.
It is more or less a replacement for EPT's tile sets */
class MasonryContainer extends Component {
  static propTypes = {
    elements: T.array.isRequired
  };

  render() {
    const masonryOptions = {
      transitionDuration: "0.5s",
      fitWidth: true,
      columnWidth: ".landingpage-icon"
    };

    // Create an array of pretty icons to pass into Masonry
    const childElements = this.props.elements.map(element => {
      const iconClassName = `ms-Icon ms-Icon--${element.msIcon}`;
      return (
        <div
          onClick={element.onClick}
          className="landingpage-icon"
          key={`pb-landing-page-${element.title}`}
        >
          <span className="ms-font-su">
            <a href={element.href}>
              <i className={iconClassName} />
            </a>
          </span>
          <span className="ms-font-m">
            <Link href={element.href}>{element.title}</Link>
          </span>
        </div>
      );
    });

    return (
      <ContentMember id="MasonryContainer" icon="Tiles" title="Shortcuts">
        <Masonry
          className={"masonry-contents"} // default ''
          elementType={"div"}
          options={masonryOptions} // default {}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
          {childElements}
        </Masonry>
      </ContentMember>
    );
  }
}

export default MasonryContainer;
