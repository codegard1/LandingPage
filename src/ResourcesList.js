import React from "react";
import { Link } from "office-ui-fabric-react/lib/Link";
import { List } from "office-ui-fabric-react/lib/List";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";

/* custom stuff */
import ContentMember from "./ContentMember";
import {BASEURL} from './definitions';
import './ResourcesList.css';

/* define items to display in the list */
const resourcesListItems = [
  {
    title:"Contact the Collaboration Team",
    url:"mailto:collabteam@privatebrands.com",
    description: "Send a message to the team that manages the Private Brands Portal"
  },
    {
    title: "Adobe Training Knowledge Base",
    url: `${BASEURL}/adobetraining/`,
    description: "Learn about Photoshop and Illustrator"
  },
  {
    title: "General Digital Training Knowledge Base",
    url: `${BASEURL}/GenDigTraining/`,
    description: "Learn how to use Generation Digital plugins for Adobe products"
  },
  {
    title: "O365 Center of Excellence",
    url: `${BASEURL}/o365resourcesite/`,
    description: "Learn about the different applications in Office 365"
  },
  {
    title: "Business Plan Guidelines",
    url: `${BASEURL}/businessplanguidelines`,
    description: "Tools and guidelines currently used by teams to successfully strategize and plan profitable, new business initiatives"
  },
  {
    title:'Technology Help & Support Enhancements',
    url: `${BASEURL}/techsupport/`,
    description: "Read instructional documents on a number of common support topics"
  }
];

const ResourcesList = props => (
  <ContentMember id="ResourcesList" title="Resources" icon="Library">
    <FocusZone direction={FocusZoneDirection.vertical}>
      <List
        items={resourcesListItems}
        onRenderCell={item => (
          <Link href={item.url} target="_blank" title={item.description}>
            &nbsp;{item.title}
          </Link>
        )}
      />
    </FocusZone>
  </ContentMember>
);

export default ResourcesList;
