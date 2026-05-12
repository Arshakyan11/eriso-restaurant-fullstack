import { useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HeaderCuisine.scss";
import { SwiperSlide, Swiper } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { cuisines } from "../../data/data";
import Aos from "aos";

const HeaderCuisine = () => {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  return (
    <div className="cuisinesBox" data-aos="fade-up">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 10,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          stopOnLastSlide: false,
          pauseOnMouseEnter: true,
        }}
        pagination={true}
        navigation={true}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {cuisines.map((elm, index) => {
          return (
            <SwiperSlide className="eachCuisine" key={index}>
              <div className="leftSide">
                <p className="restaurants">Restaurant </p>
                <p className="cusisineType">
                  {elm.cuisine} <br className="br" /> Cuisine
                </p>
                <p className="aboutCousine">{elm.info}</p>
              </div>
              <div className="rightSide">
                <img src={elm.img} alt="restaurant Img" />
                <p className="aboutCousineMedia">{elm.info}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeaderCuisine;
