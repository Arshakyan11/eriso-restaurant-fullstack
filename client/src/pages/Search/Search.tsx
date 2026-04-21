import React, { useEffect } from "react";
import styles from "./Search.module.scss";
import { gettAllDataSearching } from "../../store/SearchSlice/SearchSlice";
import { searchHelper } from "../../helpers/searchHelper";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { starRating } from "../../components/Images";
import Aos from "aos";
import { notifyForError } from "../../helpers/notifyUser";
import { sendingWatchList, sendWishListData } from "../../helpers/sendData";
import BuyingItemsList from "../../components/BuyingItemsList/BuyingItemsList";
import { getLocalUserStrict } from "../../store/api/api";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ROUTES } from "../../routes/Routes";
const Search = () => {
  const dispatch = useAppDispatch();
  const { foundedData, loading } = useAppSelector(gettAllDataSearching);
  const userInfo = getLocalUserStrict();
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  return (
    <section className={styles.searching}>
      <div className={styles.container}>
        <div className={styles.searchBox} data-aos="fade-up">
          <div className={styles.searchLine}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search Meals..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                searchHelper(dispatch, e);
              }}
            />
          </div>
          <div className={styles.allMeals}>
            {loading ? (
              <div className={styles.loaders}>
                <span className={styles.loader}></span>
                <span className={styles.loader}></span>
              </div>
            ) : foundedData.length > 1 ? (
              foundedData?.map((each) => {
                return (
                  <div key={nanoid(5)} className={styles.eachMenu}>
                    <img
                      src={each.image}
                      alt="mainDataImg"
                      className={styles.mealImg}
                    />
                    <Link
                      className={styles.infoMore}
                      to={`/${ROUTES.MENU}/eachProduct/${each.label}`}
                      state={{ data: each }}
                    >
                      More Info
                    </Link>
                    <div className={styles.infoOfMeal}>
                      <h2>{each.label}</h2>
                      <div className={styles.stars}>
                        <span>Rate:</span>
                        <div className={styles.mainStars}>
                          {each.starrArr.map((_, i) => {
                            return <img key={i} src={starRating} alt="star" />;
                          })}
                        </div>
                      </div>
                      <div className={styles.cousine}>
                        <span>Cousine</span>
                        <p>{each.cuisineType[0]}</p>
                      </div>
                      <div className={styles.dietLabels}>
                        <span>Diet</span>
                        <p>{each.dietLabels[0]}</p>
                        <p>{each.dietLabels[1]}</p>
                      </div>
                      <div className={styles.mealType}>
                        <span>Meal Type</span>
                        <p>{each.mealType[0]}</p>
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
                                })
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
            ) : (
              <div className={styles.noMealFound}>
                <p className={styles.searchingIcon}>🔍</p>
                <p className={styles.searchingTitle}>No Results Found</p>
                <p className={styles.searchingMessage}>
                  Sorry, we couldn’t find any meals matching your search. Try
                  using different keywords, checking for types, or explore our
                  popular sections below!
                </p>
                <div className={styles.buttons}>
                  <Link to={`/${ROUTES.MENU}`}>Menu</Link>
                  <Link to={`/${ROUTES.RESERVATION}`}>Reservation</Link>
                  <Link to={`/${ROUTES.RESTAURANTS}`}>Our Restaurants</Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <BuyingItemsList />
      </div>
    </section>
  );
};

export default Search;
