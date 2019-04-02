import React from "react";
import * as T from "prop-types";
import $ from "jquery";
import {
  DefaultButton,
  PrimaryButton
} from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { ChoiceGroup } from "office-ui-fabric-react/lib/ChoiceGroup";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

/* Custom Stuff */
import BaseComponent from "./BaseComponent";
import {
  BASEURL,
  feedbackTypeOptions,
  businessAreaOptions
} from "./definitions";

/* Feedback Form adds an item to the MM Portal Feedback List */
class FeedbackForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      __metadata: {
        type: "SP.Data.FeedbackListItem"
      },
      Title: "",
      FeedbackMessage: "",
      SubmittedById: -1,
      BusinessArea: "",
      FeedbackType: "Appreciation",
      Created: "",
      isFormVisible: true,
      onSubmitSuccess: false,
      onSubmitError: false,
      onSubmitErrorText: "",
      selectedBusinessArea: {}
    };

    /* bind private methods */
    this._bind(
      "_onSubmit",
      "_onHide",
      "_resetForm",
      "_addNewFeedbackItem",
      "_onBusinessAreaChange"
    );
  }

  static propTypes = {
    ajax: T.func,
    hide: T.func,
    siteUsersURL: T.string,
    currentUserEmail: T.string,
    currentUserDisplayName: T.string
  };

  /* Get the current user's Name when the Form mounts */
  componentWillMount() {
    const { siteUsersURL, currentUserEmail, ajax } = { ...this.props };
    const query = siteUsersURL + `&$filter=Email eq '${currentUserEmail}'`;

    /* get the current user's SiteUsers Id and store in state */
    $.when(ajax(query)).done(res => {
      if (res.d.results[0]) {
        this.setState({ SubmittedById: res.d.results[0].Id });
      }
    });
  }

  /* add a new item to the MM Portal Feedback list */
  _addNewFeedbackItem(metadata) {
    $.ajax({
      url: `${BASEURL}/_api/web/lists/GetByTitle('Portal Feedback')/items`,
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        "Content-Type": "application/json;odata=verbose"
      },
      data: JSON.stringify(metadata),
      success: data => {
        this.setState(
          { isFormVisible: false, onSubmitSuccess: true },
          console.log("success!", data)
        );
      },
      error: error => {
        this.setState(
          { isFormVisible: false, onSubmitError: true },
          console.log("error!", JSON.stringify(error))
        );
      }
    });
  }

  /* called when the Submit button is clicked */
  _onSubmit() {
    this.setState({ onSubmitErrorText: "" });

    /* get field values from state */
    const newItem = {
      __metadata: this.state.__metadata,
      Title: this.state.Title,
      FeedbackMessage: this.state.FeedbackMessage,
      SubmittedById: this.state.SubmittedById,
      BusinessArea: this.state.BusinessArea,
      FeedbackType: this.state.FeedbackType
    };

    /* Created Date  */
    const now = new Date();
    newItem.Created = now.toISOString();

    /* Title */
    newItem.Title = `${this.props.currentUserDisplayName}`;

    /* Check that all values are present */
    if (
      newItem.__metadata &&
      newItem.Title &&
      newItem.FeedbackMessage &&
      newItem.SubmittedById &&
      newItem.BusinessArea &&
      newItem.FeedbackType &&
      newItem.Created
    ) {
      //console.log('All Fields supplied. Will now post the item to SharePoint.');
      this._addNewFeedbackItem(newItem);
    } else {
      this.setState({
        onSubmitErrorText:
          "Not all required fields were supplied. Form was not submitted"
      });
    }
  }

  /* called when the form dismisses itself */
  _onHide() {
    this.props.hide();
  }

  /* called when the Business Area dropdown option changes */
  _onBusinessAreaChange(option) {
    this.setState({
      selectedBusinessArea: option,
      BusinessArea: option.text
    });
  }

  /* reset all fields on the form to their default values */
  _resetForm() {
    this.setState({
      __metadata: {
        type: "SP.Data.FeedbackListItem"
      },
      Title: "",
      FeedbackMessage: "",
      SubmittedById: -1,
      BusinessArea: "",
      FeedbackType: "Appreciation",
      Created: "",
      isFormVisible: true,
      onSubmitSuccess: false,
      onSubmitError: false,
      onSubmitErrorText: ""
    });
  }

  render() {
    const displayName = this.props.currentUserDisplayName || "You";
    const {
      isFormVisible,
      onSubmitSuccess,
      onSubmitError,
      onSubmitErrorText
    } = { ...this.state };
    const feedbackType = this.state.FeedbackType;
    const businessAreaKey = this.state.selectedBusinessArea.key;

    return (
      <div>
        {isFormVisible && (
          <div>
            <ChoiceGroup
              ariaLabel="Feedback Type"
              label="Feedback Type"
              options={feedbackTypeOptions}
              selectedKey={feedbackType}
              onChange={(ev, option) =>
                this.setState(
                  { FeedbackType: option.text },
                  console.log(option)
                )}
              required
            />
            <Dropdown
              ariaLabel="Business Area"
              label="Business Area"
              options={businessAreaOptions}
              placeHolder="Select an Option"
              selectedKey={businessAreaKey}
              onChanged={this._onBusinessAreaChange}
              required
            />
            <TextField
              ariaLabel="Feedback Message"
              autoAdjustHeight
              label="Feedback Message"
              multiline
              onChanged={text => this.setState({ FeedbackMessage: text })}
              required
            />
            <TextField
              ariaLabel="Submitted By"
              disabled
              label="Submitted By"
              multiline={false}
              required
              value={displayName}
            />
            <p className="ms-font-m ms-fontColor-redDark">
              {onSubmitErrorText}
            </p>
            <PrimaryButton onClick={this._onSubmit}>Submit</PrimaryButton>
          </div>
        )}

        {!isFormVisible &&
          onSubmitError && (
            <div>
              <p className="ms-font-l">
                Feedback was <strong>not</strong> submitted due to an error.
                Please try again later.
            </p>
              <DefaultButton onClick={this._onHide}>Close</DefaultButton>
            </div>
          )}

        {!isFormVisible &&
          onSubmitSuccess && (
            <div>
              <p className="ms-font-l">Feedback was submitted successfully.</p>
              <DefaultButton onClick={this._onHide}>Close</DefaultButton>
            </div>
          )}
      </div>
    );
  }
}

export default FeedbackForm;
