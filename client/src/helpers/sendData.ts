import { nanoid } from "nanoid";
import {
  addingReserveTable,
  addingWishlistToData,
  loginUser,
  registerUser,
  sendingMessage,
  updatingProfileInformation,
} from "../store/api/api";
import type { AppDispatch } from "../store/store";
import type {
  CheckUserSendingDataType,
  ContactFormValuesTypes,
  CreateUserDataType,
  FormHelpers,
  ReserveTableInfoType,
  UpdateDataOnProfileType,
} from "../types/formTypes";
import type { NavigateFunction } from "react-router-dom";
import type {
  EdamamHit,
  EdamamHitForSearch,
  EdamamHitForWishListSedningType,
  WishList,
} from "../types";
import { ROUTES } from "../routes/Routes";
import { useAsyncAction } from "../hooks/useAsyncAction";

export const createDataContact = (
  e: ContactFormValuesTypes,
  form: FormHelpers,
  dispatch: AppDispatch,
) => {
  const { name, lastname, email, subject, message } = e;
  const data = {
    id: nanoid(3),
    name,
    lastname,
    email,
    subject,
    message,
  };
  dispatch(sendingMessage(data));
  form.resetForm();
};
const run = useAsyncAction();
export const createUserData = async (
  event: CreateUserDataType,
  form: FormHelpers,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  const { userName, phoneNumber, email, password } = event;
  const data = {
    userName,
    phoneNumber,
    email,
    password,
  };
  const result = await run({
    action: () => dispatch(registerUser(data)).unwrap(),
    successMessage: (res) => res,
  });
  if (result) {
    navigate(`/${ROUTES.LOGIN}`, {
      state: { successType: "registration" },
    });
  }
  form.resetForm();
};

export const loginUserHelper = async (
  event: CheckUserSendingDataType,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  const result = await run({
    action: () => dispatch(loginUser(event)).unwrap(),
    successMessage: () => "You are logged in",
  });
  if (result) {
    localStorage.setItem("userInfo", JSON.stringify(result.user));
    localStorage.setItem("idToken", JSON.stringify(result.token));
    navigate("/");
  }
};

export const reserveTableInfo = (
  event: ReserveTableInfoType,
  form: FormHelpers,
  dispatch: AppDispatch,
) => {
  dispatch(addingReserveTable(event));
  form.resetForm();
};

export const updateDataOnProfile = (
  event: UpdateDataOnProfileType,
  form: FormHelpers,
  dispatch: AppDispatch,
) => {
  dispatch(updatingProfileInformation(event));
  form.resetForm();
};

export const sendWishListData = (
  item: EdamamHitForWishListSedningType,
): WishList => ({
  id: item.mealId,
  name: item.label,
  price: item.price,
  calories: item.calories,
  img: item.image,
  count: 1,
});

export const sendingWatchList = (dispatch: AppDispatch, item: WishList) => {
  dispatch(addingWishlistToData(item));
};

export function spreedPropertiesWidely(elm: EdamamHitForSearch) {
  return {
    label: elm.recipe.label,
    ingredients: elm.recipe.ingredients,
    image: elm.recipe.images?.REGULAR.url,
    calories: elm.recipe.calories,
    totalWeight: elm.recipe.totalWeight,
    cuisineType: elm.recipe.cuisineType,
    dietLabels: elm.recipe.dietLabels,
    mealType: elm.recipe.mealType,
  };
}

export function spreedProperties(elm: EdamamHit) {
  return {
    label: elm.recipe.label,
    ingredients: elm.recipe.ingredients,
    image: elm.recipe.images?.REGULAR.url,
    calories: elm.recipe.calories,
  };
}
