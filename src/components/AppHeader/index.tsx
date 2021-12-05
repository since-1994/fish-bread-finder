import React, {useRef} from "react";
import styles from "./index.module.scss";

const AppHeader = function () {
  const input = useRef<HTMLInputElement>(null)

  function handleHeaderClick(e: React.MouseEvent) {
    input.current?.focus();
  }
  return (
    <div className={styles.header} onClick={handleHeaderClick}>
        <i className={`far fa-search ${styles['header__logo']}`}></i>
        <input type="text" className={styles['header__input']} ref={input}/>
    </div>
  );
};

export default AppHeader;
