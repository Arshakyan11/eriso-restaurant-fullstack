import { useEffect } from "react";
import styles from "./ProfileWishList.module.scss";
import {
  changingCountOfItem,
  deleteWishListFromData,
} from "../../../store/api/api";
import { Link } from "react-router-dom";
import { burgerProfile } from "../../../components/Images";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { getUserInfo, setUserInfo } from "../../../store/AuthSlice/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import ProfileNotLogedMesComponent from "../../../components/ProfileNotLogedMesComponent/ProfileNotLogedMesComponent";
import { ROUTES } from "../../../routes/Routes";
import { useAsyncAction } from "../../../hooks/useAsyncAction";
const ProfileWishList = () => {
  const { userInfo } = useAppSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const run = useAsyncAction();
  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo]);

  if (!userInfo) {
    return <ProfileNotLogedMesComponent />;
  }
  return (
    <div className={styles.wishListSec}>
      <div className={styles.wishedItems}>
        {userInfo.wishList?.length > 0 ? (
          <div className={styles.allWishedItemsOnly}>
            {userInfo.wishList.map((elm, ind) => {
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
