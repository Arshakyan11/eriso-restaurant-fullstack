import { useEffect } from "react";
import styles from "./AboutUS.module.scss";
import { ownerImg, pic2, pic3, pic4, pic5 } from "../../components/Images";
import Aos from "aos";
const AboutUS = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  });
  return (
    <section className={styles.aboutUsSec}>
      <div className={styles.container}>
        <div className={styles.aboutUsBox}>
          <div className={styles.firstBox} data-aos="fade-left">
            <div className={styles.firstleftSide}>
              <img src={pic2} alt="img" />
              <p className={styles.title}>
                <span>Our</span> <br /> Restaurant
              </p>
            </div>
            <div className={styles.firsRightSide}>
              <p className={styles.title}>
                <span>Our</span> <br /> Restaurant
              </p>
              <p className={styles.info}>
                Welcome to our restaurant, where tradition meets innovation on
                every plate. Founded with a passion for exceptional food and
                heartfelt hospitality, our mission is to bring people together
                through unforgettable dining experiences. We believe that a
                great meal does more than satisfy hunger — it creates moments,
                sparks conversations, and brings joy. Our team of dedicated
                chefs and staff work tirelessly to ensure that every dish tells
                a story, and every guest feels at home. From sourcing fresh,
                high-quality ingredients to crafting recipes inspired by global
                cuisines, we strive to serve not just meals, but memories.
                Whether you're here for a casual lunch, a family celebration, or
                a romantic dinner, we’re honored to share our table with you.
              </p>
            </div>
          </div>
          <div className={styles.firstBox} data-aos="fade-right">
            <div className={styles.firsRightSide}>
              <p className={styles.title}>
                Our <br /> <span>Menu</span>
              </p>
              <p className={styles.info}>
                At our restaurant, the menu is more than just a list of dishes —
                it’s a curated journey through the rich flavors of world
                cuisine. Each item is carefully crafted by our chefs to reflect
                authentic traditions while adding a touch of modern creativity.
                Whether you're craving hearty comfort food, fresh and healthy
                options, or something bold and adventurous, our diverse
                selection has something to delight every taste. From appetizers
                to desserts, every ingredient is thoughtfully chosen, every
                flavor thoughtfully balanced. We take pride in offering seasonal
                specials, vegetarian and vegan choices, and signature dishes
                inspired by different cultures. Every plate we serve is made
                with passion and designed to turn an ordinary meal into an
                extraordinary experience. Come explore the flavors — your next
                favorite dish is waiting.
              </p>
            </div>
            <div className={styles.firstleftSide}>
              <img src={pic3} alt="img" />
              <p className={styles.title}>
                <span>Our</span> <br /> Menu
              </p>
            </div>
          </div>
          <div className={styles.firstBox} data-aos="fade-left">
            <div className={styles.firstleftSide}>
              <img src={pic5} alt="img" className={styles.alternativeImg} />
              <p className={styles.title}>
                <span>Our</span> <br /> Service
              </p>
            </div>
            <div className={styles.firsRightSide}>
              <p className={styles.title}>
                <span>Our</span> Service
              </p>
              <p className={styles.info}>
                Our restaurants are more than just places to eat — they are
                warm, welcoming spaces where culture, comfort, and cuisine come
                together. Each location is designed with a unique atmosphere,
                reflecting the essence of our brand while offering a distinct
                local charm. Whether you visit us in the heart of the city or in
                a quiet neighborhood, you’ll find the same commitment to
                exceptional service, authentic flavors, and a cozy environment
                where every guest feels at home. From elegant interiors and
                thoughtfully arranged seating to friendly staff and attention to
                detail, we strive to create memorable dining experiences. Our
                goal is to make every visit not just a meal, but a moment — one
                that invites you to return again and again.
              </p>
            </div>
          </div>
          <div className={styles.firstBox} data-aos="fade-right">
            <div className={styles.firsRightSide}>
              <p className={styles.title}>
                <span>Our</span> Working Time
              </p>
              <p className={styles.info}>
                We welcome guests every day of the week, offering both lunch and
                dinner services designed to suit every schedule and occasion.
                Monday – Sunday Lunch: 11:00 AM – 2:00 PM Dinner: Sunday only,
                4:00 PM – 8:00 PM Whether you're stopping by for a midday bite
                or planning a relaxing evening meal, our doors are open and our
                kitchen is ready to serve you with excellence.
              </p>
            </div>
            <div className={styles.firstleftSide}>
              <img src={pic4} alt="img" className={styles.alternativeImg} />
              <p className={styles.title}>
                <span>Our</span> <br /> Working Time
              </p>
            </div>
          </div>
          <div className={styles.firstBox} data-aos="fade-left">
            <div className={styles.firstleftSide}>
              <img src={ownerImg} alt="img" className={styles.ownerImg} />
              <p className={styles.title}>
                Owner & Executive Chef <br /> <span>Erik Arshakyan </span>
              </p>
            </div>
            <div className={styles.firsRightSide}>
              <p className={styles.title}>
                Owner & Executive Chef <br /> <span>Erik Arshakyan </span>
              </p>
              <p className={styles.info}>
                At the heart of our restaurant’s vision and success is Erik
                Arshakyan, our Owner and Executive Chef. With a lifelong passion
                for the culinary arts and a deep appreciation for diverse global
                cuisines, Erik brings creativity, skill, and soul to every dish
                that leaves our kitchen. Trained in both classical and modern
                culinary techniques, Erik has spent years mastering the flavors
                of Europe, Asia, and the Mediterranean. His journey through
                world-renowned kitchens has shaped a unique culinary identity
                that blends tradition with innovation. As a leader, Erik is
                hands-on, passionate, and deeply committed to excellence — not
                just in the food, but in the entire dining experience. His
                philosophy is simple: cook with heart, serve with pride, and
                always exceed expectations. Under his guidance, our restaurant
                has become a place where food tells a story, and guests feel
                like family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUS;
