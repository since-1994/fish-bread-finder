import React from "react";
import styles from "./index.module.scss";

interface GradeProps {
  num: number;
  onClick: Function;
  fontSize: string;
}

const Grade: React.FC<GradeProps> = function ({ num, fontSize, onClick }) {
  return (
    <div
      className={styles["grade"]}
      style={{
        fontSize,
      }}
    >
      <span className={styles["grade__item"]} onClick={() => onClick(1)}>
        {num >= 1 ? "★" : "☆"}
      </span>
      <span className={styles["grade__item"]} onClick={() => onClick(2)}>
        {num >= 2 ? "★" : "☆"}
      </span>
      <span className={styles["grade__item"]} onClick={() => onClick(3)}>
        {num >= 3 ? "★" : "☆"}
      </span>
      <span className={styles["grade__item"]} onClick={() => onClick(4)}>
        {num >= 4 ? "★" : "☆"}
      </span>
      <span className={styles["grade__item"]} onClick={() => onClick(5)}>
        {num >= 5 ? "★" : "☆"}
      </span>
    </div>
  );
};

export default Grade;
