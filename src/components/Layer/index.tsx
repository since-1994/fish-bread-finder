import React from "react";
import styles from "./index.module.scss";

interface LayerProps {
  visible: Boolean;
  children: any;
}

const Layer: React.FC<LayerProps> = function ({ visible, children }) {
  return (
    visible && (
      <div className={styles["layer"]}>
        <section className={styles["layer__inner"]}>{children}</section>
      </div>
    )
  );
};

Layer.defaultProps = {
  visible: false,
};

export default Layer;
