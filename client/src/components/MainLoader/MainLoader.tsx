import styles from "./MainLoader.module.scss";

interface MainLoaderType {
  isLoading: boolean;
}
const MainLoader = ({ isLoading }: MainLoaderType) => {
  return (
    <div
      className={`${styles.mainLoader_wrapper} ${isLoading ? styles.open : ""}`}
    >
      <div className={styles.mainLoader_loaderWrapper}>
        <div className={styles.mainLoader_loaderContent}></div>
        <p>Just a moment…</p>
      </div>
    </div>
  );
};

export default MainLoader;
