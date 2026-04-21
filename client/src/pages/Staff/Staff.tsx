import { useEffect } from "react";
import styles from "./Staff.module.scss";
import { restaurantChefs } from "../../data/chiefsData";
import Aos from "aos";
const Staff = () => {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  return (
    <section className={styles.chiefsS}>
      <div className={styles.container}>
        <div className={styles.staffSec} data-aos="fade-up">
          <h2 className={styles.titleMain}>ERISO Restaurant</h2>
          <p className={styles.info}>
            At <span>ERISO</span>, we believe that truly exceptional cuisine
            begins with passion, creativity, and the people behind the plate.
            Our team of world-class chefs comes from a diverse range of
            countries and culinary traditions, each bringing their own story,
            flavor, and philosophy to the kitchen. From the precision of sushi
            masters and the artistry of French pastry chefs to the boldness of
            tandoori flavors and the freshness of Mediterranean produce, our
            chefs blend global influences with innovative techniques to create
            unforgettable dining experiences. Their dedication goes beyond the
            recipes—they are artists, innovators, and collaborators who work
            tirelessly to ensure that every dish tells a story. Together, they
            form the heartbeat of our restaurant, turning locally-sourced
            ingredients into masterpieces and sharing a passion for excellence
            that you can taste in every bite. Meet the talented individuals who
            make our kitchen a place of inspiration, tradition, and bold
            culinary exploration.
          </p>
          <h2 className={styles.title}>Meet Our Chefs</h2>
          <div className={styles.allChefs}>
            {restaurantChefs.map((chef, ind) => {
              return (
                <div key={ind} className={styles.eachChef} data-aos="fade-up">
                  <img src={chef.img} alt="imgChef" />
                  <div className={styles.infoSec}>
                    <div className={styles.eachInfoSec}>
                      <span>Name:</span>
                      <p>{chef.name}</p>
                    </div>
                    <div className={styles.eachInfoSec}>
                      <span>Position:</span>
                      <p>{chef.position}</p>
                    </div>
                    <div className={styles.eachInfoSec}>
                      <span>Country:</span>
                      <p>{chef.country}</p>
                    </div>
                    <div className={styles.eachInfoSec}>
                      <span>Description:</span>
                      <p>{chef.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Staff;
