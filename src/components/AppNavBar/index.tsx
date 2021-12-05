import React from 'react';
import { Link } from 'react-router-dom'
import styles from './index.module.scss';

interface AppNavBarProps{
  onChangeMode: Function
  mode: Number
}

const HOMEMODE = 0;
// const ADDITEMMODE = 1;
const USERMODE = 2;

const AppNavBar: React.FC<AppNavBarProps> = function ({ onChangeMode }) {
  function handleClickEvent(e: React.MouseEvent) {
    console.log(e.currentTarget);
    onChangeMode(+(e.currentTarget.getAttribute('data-mode') || 0));
  }

  return (
    <div className={styles.navBar}>
      <button type="button" data-mode={HOMEMODE} onClick={handleClickEvent}>
        <i className="far fa-home" />
      </button>
      <div />
      <button type="button" data-mode={USERMODE} onClick={handleClickEvent}>
        <i className="far fa-user" />
      </button>
      <Link
        to="/add"
        className={styles.addItemBtn}
      >
        <i className="far fa-plus" />
      </Link>
    </div>
  );
};

export default AppNavBar;
