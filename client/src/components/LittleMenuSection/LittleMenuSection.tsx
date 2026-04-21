import { useEffect } from "react";
import styles from "./LittleMenuSection.module.scss";
import { fetchingLittleMenu } from "../../store/api/api";
import {
  gettAllInfo,
  setActiveCategory,
} from "../../store/littleMenuSlice/littleMenuSlice";
import { starRating } from "../Images";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import {
  getAllPagination,
  setInfoAboutPagination,
} from "../../store/PaginationSlice/PaginationSlice";
import Aos from "aos";
import { notifyForError } from "../../helpers/notifyUser";
import { sendingWatchList, sendWishListData } from "../../helpers/sendData";
import { useAppDispatch, useAppSelector } from "../../store/store";
import type { DataOflittleMenuType } from "../../types";
import { ROUTES } from "../../routes/Routes";

const LittleMenuSection = () => {
  const dispatch = useAppDispatch();
  const { data, loading, activeCategory } = useAppSelector(gettAllInfo);
  const { slicedData } = useAppSelector(getAllPagination) as {
    slicedData: DataOflittleMenuType[];
  };
  const userInfo = localStorage.getItem("userInfo");
  const categories: string[] = [
    "BBQ",
    "pizza",
    "sushi",
    "desserts top",
    "coffee drink",
  ];
  const buttonNames: string[] = [
    "All Category",
    "Dinner",
    "Lunch",
    "Dessert",
    "Drink",
  ];
  useEffect(() => {
    dispatch(fetchingLittleMenu("BBQ"));
    dispatch(setActiveCategory("BBQ"));
    Aos.init({ duration: 800 });
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setInfoAboutPagination({
        data: data,
        postsPerPage: 6,
        currentPage: 1,
      }),
    );
  }, [data, dispatch]);

  const handleClick = (type: string) => {
    if (type !== activeCategory) {
      dispatch(fetchingLittleMenu(type));
      dispatch(setActiveCategory(type));
    }
  };
  return (
    <div className={styles.littleMenuSec} data-aos="fade-up">
      <p className={styles.mainText}>Our popular Menu</p>
      <div className={styles.foodType}>
        {categories?.map((each, ind) => {
          return (
            <button
              key={ind}
              className={`${styles.button} ${
                activeCategory === each ? styles.activeBtn : ""
              }`}
              onClick={() => handleClick(each)}
            >
              {buttonNames[ind]}
            </button>
          );
        })}
      </div>
      <div className={styles.allMenu}>
        {loading ? (
          <div className={styles.allLoaders}>
            <div className={styles.firstLine}>
              <span className={styles.loader}></span>
              <span className={styles.loader}></span>
              <span className={styles.loader}></span>
            </div>
            <div className={styles.firstLine}>
              <span className={styles.loader2}>L &nbsp; ading</span>
            </div>
          </div>
        ) : (
          slicedData?.map((each, index) => {
            let ingredients = each.ingredients.slice(0, 4);
            return (
              <div key={index} className={styles.eachMenu} data-aos="fade-up">
                <img src={each.image} alt="img" className={styles.mealImg} />
                <div className={styles.infoOfMeal}>
                  <h2>{each.label}</h2>
                  <div className={styles.stars}>
                    <span>Rate:</span>
                    {each.starrArr?.map((_, i) => {
                      return <img key={i} src={starRating} alt="star" />;
                    })}
                  </div>
                  <div className={styles.ingredients}>
                    <h3>Ingredients:</h3>
                    <div className={styles.ingredientsName}>
                      {ingredients.map((elm, ind) => {
                        return <p key={ind}>{elm.food},</p>;
                      })}
                    </div>
                  </div>
                  <div className={styles.priceAndOrderNow}>
                    <div className={styles.priceBox}>
                      <span>Price:</span>
                      <p> ${each.price}</p>
                    </div>
                    {userInfo ? (
                      <button
                        onClick={() => {
                          sendingWatchList(
                            dispatch,
                            sendWishListData({
                              mealId: each.mealId,
                              label: each.label,
                              price: each.price,
                              calories: each.calories,
                              image: each.image,
                              count: 1,
                            }),
                          );
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <Link
                        to={`/${ROUTES.LOGIN}`}
                        onClick={() =>
                          notifyForError("Login required to add to cart.")
                        }
                        className={styles.goLogin}
                      >
                        Add to Cart
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Pagination length={data.length} />
    </div>
  );
};

export default LittleMenuSection;
