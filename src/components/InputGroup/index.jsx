import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const InputGroup = function ({ children }) {
  return <div className={styles.InputGroup}>{children}</div>;
};

InputGroup.propTypes = {
  children: PropTypes.element.isRequired,
};

InputGroup.defaultProps = {};

export default InputGroup;
