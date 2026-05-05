import styles from "./ProfileWishList.module.scss";
import {
  changingCountOfItem,
  deleteWishListFromData,
} from "../../../store/api/api";
import { Link } from "react-router-dom";
import { burgerProfile } from "../../../components/Images";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { ROUTES } from "../../../routes/Routes";
import { useAsyncAction } from "../../../hooks/useAsyncAction";
import { getallWatchlistInfo } from "../../../store/WishlistSlice/WishlistSlice";
import MainLoader from "../../../components/MainLoader/MainLoader";
const ProfileWishList = () => {
  const { wishlist, loading } = useAppSelector(getallWatchlistInfo);
  const dispatch = useAppDispatch();
  const run = useAsyncAction();

  return (
    <div className={styles.wishListSec}>
      <MainLoader isLoading={loading} />;
      <div className={styles.wishedItems}>
        {wishlist.length > 0 ? (
          <div className={styles.allWishedItemsOnly}>
            {wishlist.map((elm, ind) => {
              return (
                <div className={styles.wishedItemEach} key={ind}>
                  <img src={elm.img} alt="img" className={styles.mealImg} />
                  <div className={styles.infoOfMeal}>
                    <h2>{elm.name}</h2>
                    <div className={styles.eachLine}>
                      <p>Price: </p>
                      <h2>{elm.price}$</h2>
                    </div>
                    <div className={styles.buttons}>
                      <p
                        onClick={() =>
                          run({
                            action: () =>
                              dispatch(deleteWishListFromData(elm.id)).unwrap(),
                            successMessage: (res) => res.message,
                          })
                        }
                      >
                        <FaTrash />
                      </p>
                      <p
                        onClick={() =>
                          run({
                            action: () =>
                              dispatch(
                                changingCountOfItem({
                                  mealId: elm.id,
                                  type: "decrement",
                                }),
                              ).unwrap(),
                            successMessage: (res) => res.message,
                          })
                        }
                      >
                        <FaMinus />
                      </p>
                      <p
                        onClick={() =>
                          run({
                            action: () =>
                              dispatch(
                                changingCountOfItem({
                                  mealId: elm.id,
                                  type: "increment",
                                }),
                              ).unwrap(),
                            successMessage: (res) => res.message,
                          })
                        }
                      >
                        <FaPlus />
                      </p>
                      <p>{elm.count}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.notFoundAnyItem}>
            <h2>Your wishlist is currently empty.</h2>
            <img src={burgerProfile} alt="burgerImg" />
            <h3>
              Start adding your favorite items to keep track of them here.
            </h3>
            <div className={styles.buttons}>
              <Link to={`/${ROUTES.MENU}`}>Check Menu</Link>
              <Link to={`/${ROUTES.Search}`}>Go to Search</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileWishList;
