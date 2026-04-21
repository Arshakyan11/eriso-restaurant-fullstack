import React from "react";
import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/Routes";
const NotFound = () => {
  return (
    <section className={styles.notFoundSec}>
      <div className={styles.container}>
        <div className={styles.notFoundMainSec}>
          <div className={styles.eachLine}>
            <h2>404</h2>
            <span className={styles.loader}></span>
          </div>
          <p>
            It looks like the page you’re searching for doesn’t exist — maybe
            it’s been removed, renamed, or never existed.
          </p>
          <p>But no worries! Let’s get you back on track:</p>
          <div className={styles.buttons}>
            <Link to={`${ROUTES.HOME}`}>Back to Home</Link>
            <Link to={`/${ROUTES.MENU}`}>Explore Our Menu</Link>
            <Link to={`/${ROUTES.RESERVATION}`}>Make a Reservation</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
