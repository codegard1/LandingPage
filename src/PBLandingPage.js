import React from "react";
import $ from "jquery"; // using 1.12.3
import "office-ui-fabric-react/dist/css/fabric.min.css";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Nav } from "office-ui-fabric-react/lib/Nav";

// Custom components
import "./PBLandingPage.css";
import {
  NavDefinition,
  CommandBarDefinition,
  DOMAIN,
  BASEURL,
  setToday
} from "./definitions";
import ContentMember from "./ContentMember";
import Header from "./Header";
import Greeting from "./Greeting";
import WhatsHappening from "./WhatsHappening";
import Slider from "./Slider";
import MasonryContainer from "./MasonryContainer";
import BaseComponent from "./BaseComponent";
import FeedbackForm from "./FeedbackForm";
import FormsList from "./FormsList";
import ResourcesList from "./ResourcesList";

const TODAY = setToday();

/*
PBLandingPage is the root component that contains
most methods and stores all app data in its state
*/
class PBLandingPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalVisible: false,
      showPhonebookPanel: false,
      isFeedbackPanelVisible: false,
      NavDefinition,
      CommandBarDefinition,
      PBTileSet: [
        {
          title: "Phone Book",
          msIcon: "Phone",
          href: "#",
          onClick: this._showPhonebookPanel.bind(this)
        },
        {
          title: "Talent Center",
          msIcon: "PartyLeader",
          href: "#"
        },
        {
          title: "Magic",
          msIcon: "AutoEnhanceOn",
          href: `#`
        },
        {
          title: "Shine Bright",
          msIcon: "Sunny",
          href: `#`
        },
        {
          title: "Facilities",
          msIcon: "Lifesaver",
          href: `#`
        },
        {
          title: "Tie-Line",
          msIcon: "TransferCall",
          href: `#`
        },
        {
          title: "Engagement Works",
          msIcon: "People",
          href: `#`
        },
        {
          title: "Visiting Merchants",
          msIcon: "ShoppingCart",
          href: `#`
        }
      ],
      currentUser: {
        id: "",
        profile: {}
      },
      siteUsersURL: `${BASEURL}/_api/web/SiteUsers?$select=Id,Title,Email`,
      WhatsHappeningConfig: {
        url: `${BASEURL}/_api/web/lists/getByTitle('Whats Happening')/items?$select=ID,Title,Body,Expires&$filter=Expires ge datetime'${TODAY}'&$top=4`,
        listData: undefined
      },
      SliderConfig: {
        pbSliderUrl: `${BASEURL}/_api/web/lists/getByTitle('SliderList')/items?$select=ID,EnterpriseSliderEffectiveDate,EnterpriseSliderExpirationDate,EnterpriseSliderLink,EnterpriseSliderImage,EnterpriseSliderDescription,EnterpriseSliderRank&$orderby=EnterpriseSliderRank asc&$filter=(EnterpriseSliderExpirationDate ge datetime'${TODAY}') and (EnterpriseSliderEffectiveDate le datetime'${TODAY}')`,
        corpSliderUrl: `${DOMAIN}/sites/communications/_api/web/lists/getByTitle('News')/items?$select=ID,EnterpriseSliderEffectiveDate,EnterpriseSliderExpirationDate,EnterpriseSliderLink,EnterpriseSliderImage,EnterpriseSliderDescription,EnterpriseSliderRank&$orderby=EnterpriseSliderRank asc&$filter=(EnterpriseSliderExpirationDate ge datetime'${TODAY}') and (EnterpriseSliderEffectiveDate le datetime'${TODAY}')`,
        pbSliderListData: undefined,
        corpSliderListData: undefined
      },
      PhoneBookConfig: {},
      StocksConfig: {
        listUrl: `${DOMAIN}/_api/web/lists/getbytitle('StockQuotes')/items`,
        listData: undefined
      },
      FormsConfig: {
        listUrl: `${BASEURL}/Forms/_api/web/lists/getbytitle('eForm Registration')/items?$select=Title,eFormInitiationPageUrl,CategoryDescription&$orderby=Title`,
        listData: undefined
      }
    };

    /* bind private methods */
    this._bind(
      "_onNavItemClicked",
      "_onClosePanel",
      "_onShowPanel",
      "_ajax",
      "_showPhonebookPanel",
      "_showFeedbackPanel",
      "_hideFeedbackPanel",
      "_getUserById"
    );
  }

  componentWillMount() {
    // Get Current User ID & profile properties
    $.when(this._getUserID()).then(userId => {
      this._getUserProperties(userId).then(profileData => {
        const currentUser = this.state.currentUser;
        currentUser.profile = profileData.d ? profileData.d : undefined;
        this.setState({ currentUser });
      });
    });

    // Get state for WhatsHappening
    this._ajax(this.state.WhatsHappeningConfig.url).then(listData => {
      if (listData !== undefined) {
        const WhatsHappeningConfig = this.state.WhatsHappeningConfig;
        WhatsHappeningConfig.listData = listData;
        this.setState({ WhatsHappeningConfig });
      }
    });

    // Get state for Slider

    this._ajax(
      this.state.SliderConfig.corpSliderUrl
    ).then(corpSliderListData => {
      // console.log(`corpSliderListData: ${JSON.stringify(corpSliderListData)}`);
      const SliderConfig = this.state.SliderConfig;
      SliderConfig.corpSliderListData = corpSliderListData.d.results;
      this.setState({ SliderConfig });
    });

    this._ajax(this.state.SliderConfig.pbSliderUrl).then(pbSliderListData => {
      // console.log(`pbSliderListData: ${JSON.stringify(pbSliderListData)}`);
      const SliderConfig = this.state.SliderConfig;
      SliderConfig.pbSliderListData = pbSliderListData.d.results;
      this.setState({ SliderConfig });
    });

    // Get data for Stocks
    this._ajax(this.state.StocksConfig.listUrl).then(listData => {
      if (listData !== undefined) {
        const StocksConfig = this.state.StocksConfig;
        StocksConfig.listData = listData;
        this.setState({ StocksConfig });
      }
    });

    /* Get data for Forms */
    this._ajax(this.state.FormsConfig.listUrl).then(listData => {
      if (listData) {
        const FormsConfig = this.state.FormsConfig;
        FormsConfig.listData = listData;
        this.setState({ FormsConfig });
      }
    });
  }

  // get data as JSON from the specified URL
  _ajax(url) {
    return $.ajax({
      url,
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose"
      },
      contenttype: "application/json; charset=utf-8",
      dataType: "json"
    });
  }

  // Get a specific user's profile properties
  _getUserById(userId) {
    return this._ajax(this.state.siteUsersURL + "&$filter=Id eq " + userId);
  }

  // fires when a Nav item is clicked
  _onNavItemClicked() {
    this.setState({
      isNavOpen: false
    });
  }

  // hide the Nav Panel
  _onClosePanel() {
    this.setState({ isNavOpen: false });
  }

  // show the Nav Panel
  _onShowPanel() {
    this.setState({ isNavOpen: true });
  }

  // Get the RacF ID of the current user (from the page)
  _getUserID() {
    const id = $("meta[name=Loginid]").attr("content")
      ? $("meta[name=Loginid]")
          .attr("content")
          .split("\\")[1]
      : "";
    if (id) {
      const currentUser = this.state.currentUser;
      currentUser.id = id;
      this.setState({ currentUser });
    }

    return id || undefined;
  }

  // Get user profile properties from SharePoint
  _getUserProperties(id) {
    const Id = id ? id.toString() : undefined;
    const myurl = Id
      ? `${BASEURL}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='Privatebrands\\${id}'`
      : `${BASEURL}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`;
    return this._ajax(myurl);
  }

  // show the PhoneBook Panel
  _showPhonebookPanel() {
    this.setState({ showPhonebookPanel: true });
  }

  // show the Feedback Panel
  _showFeedbackPanel() {
    this.setState({ isFeedbackPanelVisible: true });
  }

  // hide the Feedback Panel
  _hideFeedbackPanel() {
    this.setState({ isFeedbackPanelVisible: false });
  }

  render() {
    const displayName = this.state.currentUser.profile.DisplayName;

    return (
      <Fabric id="PBLandingPage">
        <div id="superTitle">
          <span className="ms-fontSize-xxl">Private Brands</span>
        </div>
        <Header
          closePanel={this._onClosePanel}
          commandBarDefinition={this.state.CommandBarDefinition}
          isNavOpen={this.state.isNavOpen}
          navDefinition={this.state.NavDefinition}
          showPanel={this._onShowPanel}
          stocksListData={this.state.StocksConfig.listData}
          userData={this.state.currentUser}
        />

        <div className="ms-Grid" id="ContentGrid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-lg12 ms-u-xl8">
              <div id="ContentBody">
                <div className="ms-Grid">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg6 ms-u-xl6">
                      <Greeting
                        displayName={displayName}
                        isFeedbackPanelVisible={
                          this.state.isFeedbackPanelVisible
                        }
                        _showFeedbackPanel={this._showFeedbackPanel}
                      />
                    </div>

                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg6 ms-u-xl6">
                      <WhatsHappening
                        data={this.state.WhatsHappeningConfig.listData}
                      />
                    </div>
                  </div>

                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl12 ms-u-xxl6">
                      <Slider
                        pbSliderListData={
                          this.state.SliderConfig.pbSliderListData
                        }
                        corpSliderListData={
                          this.state.SliderConfig.corpSliderListData
                        }
                      />
                    </div>

                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl12 ms-u-xxl6">
                      <MasonryContainer elements={this.state.PBTileSet} />
                    </div>
                  </div>
                </div>

                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-u-sm6">
                    <FormsList listData={this.state.FormsConfig.listData} />
                  </div>

                  <div className="ms-Grid-col ms-u-sm6">
                    <ResourcesList />
                  </div>
                </div>

                <Panel
                  id="PhoneBookPanel"
                  isOpen={this.state.showPhonebookPanel}
                  onDismiss={() => this.setState({ showPhonebookPanel: false })}
                  type={PanelType.medium}
                  headerText="Private Brands Phone Book"
                  isLightDismiss
                >
                  <iframe
                    title="Private Brands Phone Book"
                    frameBorder="0"
                    id="MSOPageViewerWebPart_WebPartWPQ1"
                    name="MSOPageViewerWebPart_WebPartWPQ1"
                    width="100%"
                    height="500"
                    src="#"
                  >
                    <div className="UserGeneric">
                      The current browser does not support Web pages that
                      contain the IFRAME element. To use this Web Part, you must
                      use a browser that supports this element, such as Internet
                      Explorer 7.0 or later.
                    </div>
                  </iframe>
                </Panel>

                <Panel
                  id="FeedbackPanel"
                  isOpen={this.state.isFeedbackPanelVisible}
                  onDismiss={this._hideFeedbackPanel}
                  headerText="PB Portal Feedback"
                  isLightDismiss
                >
                  <FeedbackForm
                    ajax={this._ajax}
                    siteUsersURL={this.state.siteUsersURL}
                    hide={this._hideFeedbackPanel}
                    currentUserEmail={this.state.currentUser.profile.Email}
                    currentUserDisplayName={
                      this.state.currentUser.profile.DisplayName
                    }
                  />
                </Panel>
              </div>
            </div>

            <div className="ms-Grid-col ms-u-sm0 ms-u-lg0 ms-u-xl4 ms-u-hiddenLgDown">
              <ContentMember title="Site Navigation" id="NavPanel" icon="Globe">
                <Nav
                  selectedKey={undefined}
                  isOnTop={false}
                  groups={this.state.NavDefinition}
                />
              </ContentMember>
            </div>
          </div>
        </div>
      </Fabric>
    );
  }
}

export default PBLandingPage;
