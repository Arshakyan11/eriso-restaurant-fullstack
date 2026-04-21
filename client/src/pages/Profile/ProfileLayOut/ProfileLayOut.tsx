import { Outlet } from "react-router-dom";
import ProfileNav from "../ProfileNav/ProfileNav";
import styles from "./ProfileLayOut.module.scss";
const ProfileLayOut = () => {
  return (
    <div className={styles.profileLayOut}>
      <div className={styles.container}>
        <div className={styles.profilelayOutMain}>
          <ProfileNav />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayOut;
