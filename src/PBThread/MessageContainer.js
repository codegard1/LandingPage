import React, { Component } from "react";
import * as T from "prop-types";
import Footer from "./Footer";

import "./MessageContainer.css";

class MessageContainer extends Component {
  static propTypes = {
    ID: T.number,
    Title: T.string,
    MessageBody1: T.string,
    messageShortDesc: T.string,
    MessageCategory: T.string,
    categoryIcon: T.string,
    contactPersonName: T.string,
    contactPersonEmail: T.string,
    contactPerson2Name: T.string,
    contactPerson2Email: T.string
  };

  render() {
    const messageId = this.props.ID;
    const messageTitle = this.props.Title;
    const messageShortDesc = this.props.messageShortDesc;
    const messageCategory = this.props.MessageCategory;
    const categoryIcon = this.props.categoryIcon;
    const contactPersonName = this.props.contactPersonName;
    const contactPersonEmail = this.props.contactPersonEmail;
    const contactPerson2Name = this.props.contactPerson2Name;
    const contactPerson2Email = this.props.contactPerson2Email;
    const messagebodyHTML = this.props.MessageBody1;

    return (
      <div
        className="ms-Grid MessageContainer ms-u-slideDownIn20"
        id={`PBThread-MessageContainer-${messageId}`}
      >
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 title">
            <div className="categoryIconContainer">
              <img
                src={categoryIcon}
                title={messageCategory}
                alt={messageCategory}
              />
            </div>
            <p className="ms-font-xl">{messageTitle}</p>
            <p className="ms-font-s">{messageShortDesc}</p>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 messageBodyContainer">
            <div dangerouslySetInnerHTML={{ __html: messagebodyHTML }} />
            <p className="contactInfo">
              Please direct questions to: &nbsp;
              <a className="contactName" href={`mailto:${contactPersonEmail}`}>
                {contactPersonName}
              </a>
              {"   "}
              {contactPerson2Name && (
                <a
                  className="contactName"
                  href={`mailto:${contactPerson2Email}`}
                >
                  {contactPerson2Name}
                </a>
              )}
            </p>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageContainer;
