import { useEffect } from "react";
import styles from "./LineInfo.module.scss";
import { Link } from "react-router-dom";
import Aos from "aos";

interface LineInfoType {
  img: string;
  eachElName: string;
  middleTitle: string;
  info: string;
  linkTo: string;
  order?: number;
}

const LineInfo = ({
  img,
  eachElName,
  middleTitle,
  info,
  linkTo,
  order = 0,
}: LineInfoType) => {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  return (
    <div className={styles.lineEachElement} data-aos="fade-up">
      <div className={styles.leftSide}>
        <h2>{eachElName}</h2>
        <p className={styles.midTitle}>{middleTitle}</p>
        <p className={styles.lineEachElInfo}>{info}</p>
        <img src={img} alt={eachElName} />
        <Link to={linkTo}>Explore More</Link>
      </div>
      <div className={styles.rightSide} style={{ order: order }}>
        <img src={img} alt={eachElName} />
      </div>
    </div>
  );
};

export default LineInfo;
