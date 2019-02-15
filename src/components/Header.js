import React from 'react';
import { Link } from 'react-router-dom'; // You need to import link if you want to use it
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return(
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
      Stream
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
        All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
