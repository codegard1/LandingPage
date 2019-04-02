import React from "react";
import * as T from "prop-types";
import $ from "jquery"; // using 1.12.3
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import moment from "moment";

// Custom stuff
import MessageContainer from "./MessageContainer";
import TableOfContents from "./TableOfContents";
import ContentMember from "../ContentMember";
import "./PBThread.css";
import { BASEURL } from "../definitions";

import BaseComponent from "../BaseComponent";

//PBThread is parent of MessageList and Footer
export class PBThread extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      selectedMessage: {},
      messageTitleClassName: "ms-font-m toc-item",
      categoryIcons: [],
      isMessagesEmpty: false,
      isDataReady: false,
      debugMessageURL: `${BASEURL}/HR/PBThread/_api/web/lists/getbytitle('Outgoing Messages')/items?$select=Id, Title, MessageStatus, MessageBody1, MessageShortDescription, MessageCategory, MessageContactPersonId, MessageContactPerson2Id, MessagePubDate1, MessagePubDate2, MessagePubDate3, MessagePubDate4&$top=5&$orderby=Id`
    };

    /* bind private methods */
    this._bind(
      "_getCategoryIcons",
      "_getMessages",
      "_processMessages",
      "_loadMessage"
    );
  }

  static propTypes = {
    messagesURL: T.string,
    messageCategoriesURL: T.string,
    defaultCategoryIconURL: T.string,
    ajax: T.func,
    getUserById: T.func
  };

  componentWillMount() {
    $.when(this._getMessages(), this._getCategoryIcons()).done((m, c) => {
      if (m && c) {
        //console.log("messages:", m);
        //console.log("categories:", c);

        if (m[0].d.results.length) {
          this._processMessages(m[0].d.results, c[0].d.results);
        } else {
          this.setState({ isMessagesEmpty: true });
        }
      }
    });
  }

  // Get CategoryIcons for PB Thread
  _getCategoryIcons() {
    return this.props.ajax(this.props.messageCategoriesURL);
  }

  // Get Messages for PB Thread
  _getMessages() {
    /* production - returns filtered items  */
    return this.props.ajax(this.props.messagesURL);

    /* testing & debug - returns top 5 items */
    //return this.props.ajax(this.state.debugMessageURL);
  }

  // return properly-serialized messages for rendering
  _processMessages(messages, categories) {
    let newState = [];
    let count = messages.length;

    // Process each message in the messages array
    return $.each(messages, (index, message) => {
      // get the appropriate categoryIcon from the categories array
      let categoryArr = categories.filter(function(category) {
        // return a 1-dimensional array containing the Icon URL
        return category.Title === message.MessageCategory;
      });

      // if a contact person is not set for #2 the result returned from AJAX will be undefined
      let id1 = message.MessageContactPersonId;
      let id2 = message.MessageContactPerson2Id;

      // get the Contact Person display name(s)
      $.when(
        this.props.getUserById(id1),
        this.props.getUserById(id2)
      ).done((u1, u2) => {
        let user1 = u1[0].d.results[0];
        let user2 = u2[0].d.results[0];

        // push the processed message into newState
        let singleMessage = {
          ID: message.ID || index,
          Title: message.Title || "No Title",
          MessageBody1: message.MessageBody1 || "No message body",
          messageShortDesc: message.messageShortDesc || "",
          MessageCategory: categoryArr[0].Title || "default",
          categoryIcon:
            categoryArr[0].IconURL || this.props.defaultCategoryIcon,
          contactPersonName: user1.Title,
          contactPersonEmail: user1.Email,
          selected: false
        };

        // user2 will be undefined if it was not supplied in SharePoint
        if (user2) {
          singleMessage.contactPerson2Name = user2.Title;
          singleMessage.contactPerson2Email = user2.Email;
        }

        newState.push(singleMessage);

        // Executes when $.each() finishes
        if (!--count) {
          this.setState({ messages: newState, isDataReady: true });
        }
      });
    });
  }

  // pass message props into MessageContainer
  _loadMessage(messageID) {
    const messages = this.state.messages;
    const message = messages.filter(msg => msg.ID === messageID);
    if (message[0]) {
      messages.forEach(message => {
        message.selected = message.ID === messageID ? true : false;
      });
      this.setState({ messages, selectedMessage: message[0] });
    } else {
      console.log("Error! no messageID specified in _loadMessage()");
    }
  }

  render() {
    const isDataReady = this.state.isDataReady;
    const isMessagesEmpty = this.state.isMessagesEmpty;
    let today = moment().format("MMM Do, YYYY");

    return (
      <ContentMember id="PBThread" icon="News" title="PB Thread">
        {isDataReady && (
          <TableOfContents
            messages={this.state.messages}
            loadMessage={this._loadMessage}
          />
        )}

        {isDataReady &&
        this.state.selectedMessage.ID && (
          <MessageContainer {...this.state.selectedMessage} />
        )}

        {!isMessagesEmpty &&
        !isDataReady && (
          <Spinner size={SpinnerSize.large} label="Loading Messages" />
        )}

        {isMessagesEmpty && (
          <div className="no-messages-notice">
            <span className="ms-font-xl">
              <i className="ms-Icon ms-Icon--Info" /> No Messages for {today}
            </span>
          </div>
        )}
      </ContentMember>
    );
  }
}

export default PBThread;
