import React from 'react';
import styles from './index.module.scss';

interface LayerProps{
  visible: Boolean;
  children: any
}

const Layer: React.FC<LayerProps> = function ({ visible, children }) {
  return (
    visible && (
      <div className={styles.Layer}>
        <section className={styles.Inner}>{children}</section>
      </div>
    )
  );
};

Layer.defaultProps = {
  visible: false,
};

export default Layer;
