import React, { Component } from "react";
import * as T from "prop-types";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Nav } from "office-ui-fabric-react/lib/Nav";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";

/* Custom Stuff */
import "./Header.css";
import { StocksContainer } from "./StocksContainer";

/* Header is permanently located at the very top of the page and it contains navigational links */
class Header extends Component {
  static propTypes = {
    navDefinition: T.array.isRequired,
    commandBarDefinition: T.object.isRequired,
    isNavOpen: T.bool.isRequired,
    closePanel: T.func.isRequired,
    showPanel: T.func.isRequired,
    userData: T.object
  };

  render() {
    return (
      <div className="ms-Grid" id="Header">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm2 ms-u-md1 ms-u-lg1 ms-u-hiddenXlUp">
            <nav>
              <ul className="m-topnav-left">
                <li onClick={this.props.showPanel}>
                  <i
                    className="ms-Icon ms-Icon--GlobalNavButton ms-font-xxl ms-fontColor-neutralPrimary"
                    aria-hidden="true"
                  />
                </li>
              </ul>
            </nav>
          </div>

          <div className="ms-Grid-col ms-u-sm6 ms-u-md7 ms-u-lg8 ms-u-xl10 ms-u-xxl10">
            <div className="commandBar-container ms-font-m-plus">
              <CommandBar
                isSearchBoxVisible={false}
                elipisisAriaLabel="More options"
                items={this.props.commandBarDefinition.items}
              />
            </div>
          </div>

          <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg3 ms-u-xl2 ms-u-xxl2">
            <StocksContainer listData={this.props.stocksListData} />
          </div>
        </div>
        <Panel
          isOpen={this.props.isNavOpen}
          type={PanelType.smallFixedNear}
          isLightDismiss
          onDismiss={this.props.closePanel}
          onRenderHeader={() => (
            <span className="ms-font-l" style={{ paddingLeft: "1.5em" }}>
              <i className="ms-Icon ms-Icon--Globe" />
              &nbsp;Site Navigation
            </span>
          )}
        >
          <Nav
            className="NavPanel"
            selectedKey={undefined}
            isOnTop={false}
            groups={this.props.navDefinition}
          />
        </Panel>
      </div>
    );
  }
}

export default Header;
