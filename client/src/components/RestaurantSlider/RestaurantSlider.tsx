import { useState } from "react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./RestaurantSlider.scss";
import type { Swiper as SwiperType } from "swiper";
interface RestaurantSliderType {
  imagesArr: [string, string, string, string];
}
const RestaurantSlider = ({ imagesArr }: RestaurantSliderType) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="allSwipers">
      <div className="firstSwiper">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          navigation={true}
          slidesPerView={"auto"}
          autoplay={{
            delay: 2500,
            stopOnLastSlide: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay, FreeMode, Thumbs, Navigation]}
          className="mySwipe2"
        >
          {imagesArr.map((elm, ind) => {
            return (
              <SwiperSlide key={ind}>
                <img src={elm} alt="img" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="secondSwiper">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {imagesArr.map((elm) => {
            return (
              <SwiperSlide key={nanoid(3)}>
                <img src={elm} alt="img" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default RestaurantSlider;
