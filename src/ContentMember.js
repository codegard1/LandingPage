import React from "react";
import * as T from "prop-types";

/* custom stuff */
import "./ContentMember.css";

/* ContentMember is a container element for components inside #ContentGrid */
const ContentMember = props => {
  const title = props.title || ""; // Title text
  const id = props.id || ""; // the id to assign to the child <div>
  const icon = "ms-Icon ms-Icon--" + props.icon || ""; // name of the Fabric Icon to display
  const children = props.children; // children elements

  return (
    <div id={id} className="content-member">
      {title && (
        <div className="content-member-title ms-font-xl">
          <span className="ms-font-xl" data-titleText={title}>
            <i className={icon} />{" "}
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

ContentMember.propTypes = {
  title: T.string,
  id: T.string,
  icon: T.string
};

export default ContentMember;
