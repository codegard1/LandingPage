import React from 'react';
import * as T from 'prop-types';

import './Header.css';

// Header is child of PBThread 
const Header = (props) => {
  const headerImageURL = props.headerImageURL;

  return (
    <div id="PBThread-Header">
      <img src={headerImageURL} alt="PB Thread Logo" />
    </div>
  );
}

Header.propTypes = {
  headerImageURL: T.string,
  messages: T.array
}

export default Header;
