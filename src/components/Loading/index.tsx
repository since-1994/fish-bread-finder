import styles from "./index.module.scss";

interface LoadingProps {
  visible: Boolean;
}

const Loading: React.FC<LoadingProps> = function ({ visible }) {
  return (
    visible && (
      <div className={styles["loading"]}>
        <span className={styles["loading__spinner"]}></span>
      </div>
    )
  );
};

export default Loading;
