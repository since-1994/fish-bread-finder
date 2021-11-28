import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layer.module.scss';

const Layer = function ({ visible, children }) {
  return (
    visible && (
      <div className={styles.Layer}>
        <section className={styles.Inner}>{children}</section>
      </div>
    )
  );
};

Layer.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

Layer.defaultProps = {
  visible: false,
};

export default Layer;
