import { useEffect } from "react";
import styles from "./Home.module.scss";
import HeaderCuisine from "../../components/Header/HeaderCuisine";
import {
  reserveImg1,
  reserveImg2,
  reserveImg3,
  welcomeImg,
} from "../../components/Images";
import { Link } from "react-router-dom";
import LittleMenuSection from "../../components/LittleMenuSection/LittleMenuSection";
import { restaurantChefs } from "../../data/chiefsData";
import CustomersComment from "../../components/CustomersComment/CustomersComment";
import Aos from "aos";
import BuyingItemsList from "../../components/BuyingItemsList/BuyingItemsList";
import { ROUTES } from "../../routes/Routes";
const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  return (
    <div className={styles.homeSection}>
      <div className={styles.container}>
        <div className={styles.homeBox}>
          <HeaderCuisine />
          <div className={styles.welcomeSec} data-aos="fade-up">
            <div className={styles.leftSide}>
              <img src={welcomeImg} alt="welcomeImg" />
              <p className={styles.welcomeText}>
                We’re thrilled to have you join us on a flavorful journey around
                the world. Here, every dish is crafted with passion, every
                ingredient is chosen with care, and every guest is treated like
                family. Whether you're craving comforting classics or curious to
                explore new tastes, we've prepared something special just for
                you. Sit back, relax, and let your culinary adventure begin!
              </p>
              <Link to={ROUTES.MENU}>See our Menu</Link>
            </div>
            <div className={styles.rightSide}>
              <p className={styles.welcome}>
                Welcome to <br className={styles.br} /> <span>ERISO</span>
              </p>
              <p className={styles.welcomeText}>
                We’re thrilled to have you join us on a flavorful journey around
                the world. Here, every dish is crafted with passion, every
                ingredient is chosen with care, and every guest is treated like
                family. Whether you're craving comforting classics or curious to
                explore new tastes, we've prepared something special just for
                you. Sit back, relax, and let your culinary adventure begin!
              </p>
              <Link to={ROUTES.MENU}>See our Menu</Link>
            </div>
          </div>
          <LittleMenuSection />
          <div className={styles.reservationSec} data-aos="fade-up">
            <div className={styles.leftSideReserve}>
              <div className={styles.images}>
                <img src={reserveImg1} alt="img" className={styles.mainImg} />
                <img
                  src={reserveImg2}
                  alt="img"
                  className={styles.secondaryImg}
                />
                <img
                  src={reserveImg3}
                  alt="img"
                  className={styles.secondaryImg2}
                />
              </div>
              <p>
                Whether you're planning a romantic dinner, a family gathering,
                or a special celebration, we’re here to make your experience
                unforgettable. Reserve your table today and enjoy the finest
                cuisine, warm hospitality, and a welcoming atmosphere. We
                recommend booking in advance, especially on weekends, to ensure
                the perfect spot for you and your guests. Simply select your
                preferred date, time, and party size — and leave the rest to us.
              </p>
              <Link to={ROUTES.RESERVATION}>Reservation</Link>
            </div>
            <div className={styles.rightSideReserve}>
              <h2>
                Let's reserve <br className={styles.br} />
                <span>a table</span>
              </h2>
              <p>
                Whether you're planning a romantic dinner, a family gathering,
                or a special celebration, we’re here to make your experience
                unforgettable. Reserve your table today and enjoy the finest
                cuisine, warm hospitality, and a welcoming atmosphere. We
                recommend booking in advance, especially on weekends, to ensure
                the perfect spot for you and your guests. Simply select your
                preferred date, time, and party size — and leave the rest to us.
              </p>
              <Link to={ROUTES.RESERVATION}>Reservation</Link>
            </div>
          </div>
          <div className={styles.chiefSection} data-aos="fade-up">
            <h2 className={styles.mainTitle}>Our greatest chef</h2>
            <div className={styles.chiefsBox}>
              {restaurantChefs.slice(0, 3).map((chief, ind) => {
                return (
                  <div className={styles.eachChief} key={ind}>
                    <img src={chief.img} alt="chiefImg" />
                    <h2>{chief.name}</h2>
                    <h3>{chief.position}</h3>
                  </div>
                );
              })}
            </div>
            <Link to={ROUTES.STAFF}>See Our Chef Team</Link>
          </div>
          <CustomersComment />
          <div className={styles.workingTimeAll} data-aos="fade-up">
            <div className={styles.workingDays}>
              <h2>We are open from</h2>
              <h3>Monday-Sunday</h3>
              <p>Launch : Mon-Sun : 11:00am-02:00pm</p>
              <p>Dinner : sunday : 04:00pm-08:00pm</p>
              <div className={styles.buttons}>
                <Link to={ROUTES.MENU}>Menu</Link>
                <Link to={ROUTES.RESERVATION}>Reservation</Link>
              </div>
            </div>
          </div>
        </div>
        <BuyingItemsList />
      </div>
    </div>
  );
};

export default Home;
