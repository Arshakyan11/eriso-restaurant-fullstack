import styles from "./EachProduct.module.scss";
import { Link, useLocation } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { notifyForError } from "../../helpers/notifyUser";
import { sendingWatchList, sendWishListData } from "../../helpers/sendData";
import { useAppDispatch } from "../../store/store";
import type { DataOfSearchingMenuType } from "../../types";
import { ROUTES } from "../../routes/Routes";
const EachProduct = () => {
  const { state } = useLocation() as {
    state: { data: DataOfSearchingMenuType };
  };
  const userInfo = localStorage.getItem("userInfo");
  const mealObj = state.data;
  const dispatch = useAppDispatch();
  return (
    <section className={styles.eachMealSec}>
      <div className={styles.container}>
        <div className={styles.eachProduct}>
          <div className={styles.leftSection}>
            <img src={mealObj.image} alt="mealImg" />
            <div className={styles.infoSecMiddle}>
              <p className={styles.ingredientsTitle}>Ingredients:</p>
              <div className={styles.ingredients}>
                <p>{mealObj.ingredients.map((elm) => elm.food).join(", ")}</p>
              </div>
            </div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.infoSecMiddle}>
              <p>Name:</p>
              <p>{mealObj.label}</p>
            </div>
            <div className={styles.infoSecMiddle}>
              <p>mealType:</p>
              <p>{mealObj.mealType[0]}</p>
            </div>
            <div className={styles.infoSecMiddle}>
              <p>Price:</p>
              <p>{mealObj.price}$</p>
            </div>
            <div className={styles.infoSecMiddle}>
              <p>Calories:</p>
              <p>{mealObj.calories.toFixed(1)}kcal</p>
            </div>
            <div className={styles.infoSecMiddle}>
              <p>Cuisine:</p>
              <p>{mealObj.cuisineType}</p>
            </div>
            <div className={styles.infoSecMiddle}>
              <p>dietLabels:</p>
              <p>{mealObj.dietLabels}</p>
            </div>
            <div className={styles.infoSecMiddle}>
              <p>Weight:</p>
              <p>{mealObj.totalWeight.toFixed(1)}g</p>
            </div>
            <div className={styles.buttons}>
              <Link to={`/${ROUTES.MENU}`}>Go To Menu</Link>
              {userInfo ? (
                <button
                  onClick={() => {
                    sendingWatchList(
                      dispatch,
                      sendWishListData({
                        mealId: mealObj.mealId,
                        label: mealObj.label,
                        price: mealObj.price,
                        calories: mealObj.calories,
                        image: mealObj.image,
                        count: 1,
                      }),
                    );
                  }}
                >
                  Order Now <FaCartShopping />
                </button>
              ) : (
                <Link
                  to={`/${ROUTES.LOGIN}`}
                  onClick={() =>
                    notifyForError("Login required to add to cart.")
                  }
                  className={styles.goLogin}
                >
                  Order Now <FaCartShopping />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EachProduct;
