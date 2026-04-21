import { ROUTES } from "../../routes/Routes";
import styles from "./ProfileNotLogedMesComponent.module.scss";
import { Link } from "react-router-dom";
const ProfileNotLogedMesComponent = () => {
  return (
    <div className={styles.notFoundAnyItem}>
      <h2>User not found. Please log in first.</h2>
      <Link to={`/${ROUTES.LOGIN}`}>Go to Login</Link>
    </div>
  );
};

export default ProfileNotLogedMesComponent;
