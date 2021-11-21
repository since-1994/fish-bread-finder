import React from 'react';
import './AppHeader.scss';
import logo from '../../static/images/logo.png';

const AppHeader = function () {
  return (
    <div className="header">
      <div className="header__logo header__item">
        <img src={logo} alt="" />
        당신 근처의 붕어빵
      </div>
      <div className="header__input header__item">
        <input type="text" />
      </div>
    </div>
  );
};

export default AppHeader;
