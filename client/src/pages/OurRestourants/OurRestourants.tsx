import { useEffect } from "react";
import { FaClock, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import styles from "./OurRestourants.module.scss";
import RestaurantSlider from "../../components/RestaurantSlider/RestaurantSlider";
import { eachRestaurantData } from "../../data/eachRestaurant";
import Aos from "aos";

const OurRestourants = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  });
  return (
    <section className={styles.OurAddressSec}>
      <div className={styles.container}>
        <div className={styles.ourRestaurants}>
          {eachRestaurantData.map((elm, ind) => {
            return (
              <div
                className={styles.firstRestaurant}
                data-aos="fade-up"
                key={ind}
              >
                <p className={styles.title}>
                  <span>ERISO</span> {elm.location}
                </p>
                <div className={styles.info}>
                  <div className={styles.infoEachLine}>
                    <FaLocationDot />
                    <p>{elm.address}</p>
                  </div>
                  <div className={styles.infoEachLine}>
                    <FaPhone />
                    <p>{elm.phone}</p>
                  </div>
                  <div className={styles.infoEachLine}>
                    <FaEnvelope />
                    <p>{elm.email}</p>
                  </div>
                  <div className={styles.infoEachLine}>
                    <FaClock />
                    <p>{elm.workingTime}</p>
                  </div>
                </div>
                <RestaurantSlider imagesArr={elm.images} />
                <div className={styles.location}>
                  <div className={styles.textInfo}>
                    <span> {elm.city}</span>
                    <div className={styles.mapWrapperMedian}>
                      <iframe
                        src={elm.iframeLink}
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        loading="lazy"
                        title="map"
                      ></iframe>
                    </div>
                    <p>{elm.info}</p>
                  </div>
                  <div className={styles.mapWrapper}>
                    <iframe
                      src={elm.iframeLink}
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      loading="lazy"
                      title="map"
                    ></iframe>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurRestourants;
