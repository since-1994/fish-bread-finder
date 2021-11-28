import React, { useState } from 'react';
import styles from './index.module.scss';

const AddItemButton = function () {
  const [, setMode] = useState(0);

  function handleClickEvent(e) {
    setMode(e.target.mode);
  }

  return (
    <div className={styles.navBar}>
      <div mode={0} onClick={handleClickEvent}>
        <i className="far fa-home" />
      </div>
      <div />
      <div mode={2} onClick={handleClickEvent}>
        <i className="far fa-user" />
      </div>
      <div mode={1} onClick={handleClickEvent} className={styles.addItemBtn}>
        <i className="far fa-plus" />
      </div>
    </div>
  );
};

export default AddItemButton;
