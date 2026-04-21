import { useEffect, useRef } from "react";
import "./BuyingItemsList.scss";
import { FaCartShopping } from "react-icons/fa6";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  getAllMiniBuyingListInfo,
  setModalOpenType,
} from "../../store/MiniBuyingListSlice/MiniBuyingListSlice";
import {
  changingCountOfItem,
  deleteWishListFromData,
} from "../../store/api/api";
import { getUserInfo } from "../../store/AuthSlice/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
const BuyingItemsList = () => {
  const dispatch = useAppDispatch();
  const { isOpenModal } = useAppSelector(getAllMiniBuyingListInfo);
  const { userInfo } = useAppSelector(getUserInfo);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        isOpenModal
      ) {
        dispatch(setModalOpenType(false));
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpenModal, dispatch]);

  useEffect(() => {
    dispatch(setModalOpenType(false));
  }, [dispatch]);
  if (!userInfo) return null;
  return (
    <div className="allItems">
      <div
        className="buyingList"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setModalOpenType(!isOpenModal));
        }}
      >
        <FaCartShopping />
      </div>
      {isOpenModal ? (
        <div className="modalContainer">
          <div className="modal" ref={modalRef}>
            {userInfo.wishList.length > 0 ? (
              <>
                <div className="selectedItems">
                  {userInfo.wishList.map((elm, ind) => {
                    return (
                      <div className="eachItem" key={ind}>
                        <img src={elm.img} alt="foodImg" />
                        <div className="infoOfItem">
                          <p>{elm.name.slice(0, 30)}</p>
                          <p>{elm.price}$</p>
                          <div className="buttons">
                            <p
                              onClick={() =>
                                dispatch(deleteWishListFromData(elm.id))
                              }
                            >
                              <FaTrash />
                            </p>
                            <p
                              onClick={() =>
                                dispatch(
                                  changingCountOfItem({
                                    mealId: elm.id,
                                    type: -1,
                                  })
                                )
                              }
                            >
                              <FaMinus />
                            </p>
                            <p
                              onClick={() =>
                                dispatch(
                                  changingCountOfItem({
                                    mealId: elm.id,
                                    type: 1,
                                  })
                                )
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
                <div className="buttons">
                  <button>Order Now</button>
                </div>
              </>
            ) : (
              <h2>There is no any item yet!</h2>
            )}
            <div className="totalCount">
              <p>Total</p>
              <p>{userInfo.totalCheckPrice}$</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BuyingItemsList;
