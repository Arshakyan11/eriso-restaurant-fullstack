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
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getallWatchlistInfo } from "../../store/WishlistSlice/WishlistSlice";
import { useAsyncAction } from "../../hooks/useAsyncAction";
const BuyingItemsList = () => {
  const dispatch = useAppDispatch();
  const { isOpenModal } = useAppSelector(getAllMiniBuyingListInfo);
  const { wishlist, totalCheckPrice } = useAppSelector(getallWatchlistInfo);
  const modalRef = useRef<HTMLDivElement>(null);
  const run = useAsyncAction();

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
  if (!wishlist) return null;
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
            {wishlist.length > 0 ? (
              <>
                <div className="selectedItems">
                  {wishlist.map((elm, ind) => {
                    return (
                      <div className="eachItem" key={ind}>
                        <img src={elm.img} alt="foodImg" />
                        <div className="infoOfItem">
                          <p>{elm.name.slice(0, 30)}</p>
                          <p>{elm.price}$</p>
                          <div className="buttons">
                            <p
                              onClick={() =>
                                run({
                                  action: () =>
                                    dispatch(
                                      deleteWishListFromData(elm.id),
                                    ).unwrap(),
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
                <div className="buttons">
                  <button>Order Now</button>
                </div>
              </>
            ) : (
              <h2>There is no any item yet!</h2>
            )}
            <div className="totalCount">
              <p>Total</p>
              <p>{`${totalCheckPrice}$`}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BuyingItemsList;
