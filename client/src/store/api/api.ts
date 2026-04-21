import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notifyForError, notifyForSMth } from "../../helpers/notifyUser";
import { setEmailManualy } from "../ProfileSlice/ProfileSlice";
import { setUserInfoManualy } from "../ReservationSlice/ReservationSlice";
import { nanoid } from "nanoid";
import { setUserInfo } from "../AuthSlice/AuthSlice";
import type {
  DataOflittleMenuType,
  DataOfSearchingMenuType,
  EdamamHit,
  EdamamHitForSearch,
  UserInfoType,
  WishList,
} from "../../types/apiHandlingTypes";
import type {
  CheckingUserType,
  ContactFormValuesWithId,
  CreateUserDataTypeWithId,
  ReserveTableInfoType,
  UpdateDataOnProfileType,
} from "../../types/formTypes";
import type { AppDispatch } from "../store";
import {
  spreedProperties,
  spreedPropertiesWidely,
} from "../../helpers/sendData";
import { ROUTES } from "../../routes/Routes";

const instant = axios.create({
  timeoutErrorMessage: "Error 404",
  timeout: 10000,
  headers: {
    "Edamam-Account-User": "myrestaurant123",
  },
});

export function getLocalUserStrict(): UserInfoType | null {
  const strSData = localStorage.getItem("userInfo");
  if (!strSData) return null;
  return JSON.parse(strSData);
}

const localStorageContacts = axios.create({
  timeoutErrorMessage: "Error 404",
  timeout: 10000,
  baseURL: "http://localhost:5000/usersMessage",
});
export const fetchingLittleMenu = createAsyncThunk<
  DataOflittleMenuType[],
  string,
  { rejectValue: string }
>("littleMenu/fetchingLittleMenu", async (query, { rejectWithValue }) => {
  try {

    const res = await instant.get<{ hits: EdamamHit[] }>(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&diet=balanced&app_id=${import.meta.env.VITE_FOODS_API_ID}&app_key=${import.meta.env.VITE_FOODS_API_KEY}`,
    );
    let response = res.data.hits;
    if (response.length > 16) {
      response.length = 12;
    }
    const finalResult: DataOflittleMenuType[] = response.map((elm) => ({
      price: (Math.random() * 55 + 2).toFixed(2),
      starrArr: [...Array(Math.round(Math.random() * 2 + 3))].map(
        (_, i) => i + 1,
      ),
      mealId: nanoid(4),
      ...spreedProperties(elm),
    }));
    return finalResult;
  } catch (error: unknown) {
    return rejectWithValue("Error 404");
  }
});

export const sendingMessage = createAsyncThunk<
  string,
  ContactFormValuesWithId,
  { rejectValue: string }
>("ContactUsSlice/sendingMessage", async (data, { rejectWithValue }) => {
  try {
    localStorageContacts({ method: "POST", data: data });
    notifyForSMth("Message was send Successfuly");
    return "Success";
  } catch (error) {
    return rejectWithValue("Smth Went Wrong!");
  }
});

export const fetchingSearchMenu = createAsyncThunk<
  {
    queryName: string;
    data: DataOfSearchingMenuType[];
  },
  string,
  { rejectValue: string }
>("searching/fetchingSearchMenu", async (query, { rejectWithValue }) => {
  try {
    const res = await instant.get<{ hits: EdamamHitForSearch[] }>(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&diet=balanced&app_id=${import.meta.env.VITE_FOODS_API_ID}&app_key=${import.meta.env.VITE_FOODS_API_KEY}`,
    );
    let response = res.data.hits;
    const finalResult: DataOfSearchingMenuType[] = response.map((elm) => ({
      starrArr: [...Array(Math.round(Math.random() * 2 + 3))].map(
        (_, i) => i + 1,
      ),
      price: (Math.random() * 55 + 2).toFixed(2),
      mealId: nanoid(4),
      ...spreedPropertiesWidely(elm),
    }));
    return { queryName: query, data: finalResult };
  } catch (error) {
    return rejectWithValue("Error 404");
  }
});

export const fetchingGlobalMenu = createAsyncThunk<
  {
    response: DataOfSearchingMenuType[];
    query: string;
  },
  string,
  { rejectValue: string }
>("menu/fetchingGlobalMenu", async (query, { rejectWithValue }) => {
  try {
    const res = await instant.get<{ hits: EdamamHitForSearch[] }>(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&diet=balanced&app_id=${import.meta.env.VITE_FOODS_API_ID}&app_key=${import.meta.env.VITE_FOODS_API_KEY}`,
    );
    let response = res.data.hits;
    const finalResult: DataOfSearchingMenuType[] = response.map((elm) => ({
      price: (Math.random() * 55 + 2).toFixed(2),
      starrArr: [...Array(Math.round(Math.random() * 2 + 3))].map(
        (_, i) => i + 1,
      ),
      mealId: nanoid(4),
      ...spreedPropertiesWidely(elm),
    }));
    return { response: finalResult, query };
  } catch (error) {
    return rejectWithValue("Error 404 while getting Result");
  }
});

const localStorageUsers = axios.create({
  baseURL: "http://localhost:5000/users",
  timeout: 10000,
  timeoutErrorMessage: "Too much time for fetching data",
});

const setingLocalStorageUserinfo = (
  dispatch: AppDispatch,
  data: UserInfoType,
) => {
  localStorage.setItem("userInfo", JSON.stringify(data));
  dispatch(setUserInfo(data));
};

const patchingUserDataToLocal = (id: string, data: Partial<UserInfoType>) => {
  return axios.patch(`http://localhost:5000/users/${id}`, data, {
    timeout: 10000,
    timeoutErrorMessage: "Too much time for fetching data",
  });
};

export const creatingUserData = createAsyncThunk<
  string,
  CreateUserDataTypeWithId,
  { rejectValue: string }
>("registration/creatingUserData", async (arg, { rejectWithValue }) => {
  try {
    await localStorageUsers({ method: "POST", data: arg });
    notifyForSMth("Account Registered Successfuly");
    return "Success";
  } catch (error) {
    return rejectWithValue("Cant Add User to list, PLs try again later");
  }
});

export const checkingUserExisting = createAsyncThunk<
  boolean,
  CheckingUserType,
  { rejectValue: string }
>("login/checkingUserExisting", async (data, { rejectWithValue, dispatch }) => {
  try {
    const { email, password, navigate } = data;
    const res = await localStorageUsers({
      method: "GET",
    });
    const response: UserInfoType[] = res.data;
    const lastResult = response.find(
      (elm) => elm.email === email && elm.password === password,
    );
    if (lastResult) {
      localStorage.setItem("userInfo", JSON.stringify(lastResult));
      dispatch(setEmailManualy(email));
      dispatch(setUserInfoManualy(lastResult));
      dispatch(setUserInfo(lastResult));
      notifyForSMth("You Logged In");
      navigate(ROUTES.HOME);
      return true;
    } else {
      notifyForError("User not found");
      return false;
    }
  } catch (error) {
    return rejectWithValue("Error While Checking User");
  }
});

export const addingReserveTable = createAsyncThunk<
  UserInfoType,
  ReserveTableInfoType,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "reservation/addingReserveTable",
  async (obj, { rejectWithValue, dispatch }) => {
    try {
      const userInfo = getLocalUserStrict();
      if (!userInfo) {
        return rejectWithValue("User not logged in");
      }
      const response = await localStorageUsers
        .get<UserInfoType[]>("/")
        .then((res) => res.data);
      const findedUser = response.find(
        (elm) => elm.id === userInfo.id && !elm.reservation,
      );
      if (findedUser) {
        const reservation = {
          reservation: obj,
        };
        patchingUserDataToLocal(`${findedUser["id"]}`, reservation);
        const updatedData = {
          ...userInfo,
          reservation: obj,
        };
        setingLocalStorageUserinfo(dispatch, updatedData);
        notifyForSMth("Reservation passed Successfuly");
        return updatedData;
      } else {
        notifyForError(
          "You have already had reservation, Go to Profile for concelation",
        );
        return rejectWithValue(
          "You have already had reservation, go to Profile to cancel",
        );
      }
    } catch (error) {
      return rejectWithValue("Error 404");
    }
  },
);

export const deletingReservationTime = createAsyncThunk<
  UserInfoType,
  void,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "reservation/deletingReservationTime",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const userInfo = getLocalUserStrict();
      if (!userInfo) {
        return rejectWithValue("User not logged in");
      }
      const { data } = await localStorageUsers.get<UserInfoType>(
        `/${userInfo.id}`,
      );

      const updatedData: UserInfoType = { ...data };
      delete updatedData.reservation;
      await localStorageUsers.put(`/${userInfo.id}`, updatedData);
      localStorage.setItem("userInfo", JSON.stringify(updatedData));
      dispatch(setUserInfo(updatedData));
      notifyForSMth("Reservation deleted successfuly");
      return updatedData;
    } catch (error) {
      return rejectWithValue("Error while deleting Reservation");
    }
  },
);

export const updatingProfileInformation = createAsyncThunk<
  void,
  UpdateDataOnProfileType,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "profile/updatingProfileInformation",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const userInfo = getLocalUserStrict();
      if (!userInfo) {
        return rejectWithValue("User not logged in");
      }
      if (
        data.userOldPass === userInfo.password &&
        userInfo.password !== data.userNewPass
      ) {
        patchingUserDataToLocal(userInfo.id, {
          password: data.userNewPass,
        });
        userInfo.password = data.userNewPass;
        setingLocalStorageUserinfo(dispatch, userInfo);
        notifyForSMth("Password Changed Successfuly");
      } else if (
        data.userOldPass === userInfo.password &&
        userInfo.password === data.userNewPass
      ) {
        notifyForError("Password must be different from your current password");
      } else {
        notifyForError("The current password is incorrect");
      }
    } catch (error) {
      return rejectWithValue("Error 404");
    }
  },
);

export const addingWishlistToData = createAsyncThunk<
  WishList[],
  WishList,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "wishlist/addingWishlistToData",
  async (wishObj, { dispatch, rejectWithValue }) => {
    try {
      const userInfo = getLocalUserStrict();
      if (!userInfo) {
        return rejectWithValue("User not logged in");
      }
      const checkingExistingMeal = await localStorageUsers
        .get<UserInfoType>(`/${userInfo.id}`)
        .then((res) => res.data?.wishList || []);
      const isExisting = checkingExistingMeal.find(
        (elm) => elm.name === wishObj.name && elm.calories === wishObj.calories,
      );
      if (!isExisting) {
        const updatedWishlist = [...(userInfo.wishList || []), wishObj];
        let totalCount = updatedWishlist.reduce(
          (acc, elm) => acc + parseFloat(elm.price),
          0,
        );
        const newUserInfo = {
          wishList: updatedWishlist,
          totalCheckPrice: totalCount.toFixed(3),
        };
        await patchingUserDataToLocal(userInfo.id, newUserInfo);
        setingLocalStorageUserinfo(dispatch, {
          ...userInfo,
          ...newUserInfo,
        });
        notifyForSMth("Successfully added to Cart");
        return updatedWishlist;
      } else {
        notifyForError("Item is already on wishlist!");
        return userInfo.wishList;
      }
    } catch (error) {
      return rejectWithValue("Error while adding Wishlist");
    }
  },
);

export const deleteWishListFromData = createAsyncThunk<
  WishList[],
  string,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "wishlist/deleteWishListFromData",
  async (mealId, { dispatch, rejectWithValue }) => {
    try {
      const userInfo = getLocalUserStrict();
      if (!userInfo) {
        return rejectWithValue("User not logged in");
      }
      const response = await localStorageUsers
        .get<UserInfoType>(`/${userInfo.id}`)
        .then((res) => {
          return res.data;
        });
      const newWishList = response.wishList.filter((elm) => elm.id !== mealId);
      let totalCount = newWishList.reduce(
        (acc, elm) => acc + +elm.price * +elm.count,
        0,
      );
      const newUserInfo = {
        wishList: newWishList,
        totalCheckPrice: totalCount.toFixed(3),
      };
      await patchingUserDataToLocal(userInfo.id, newUserInfo);
      setingLocalStorageUserinfo(dispatch, {
        ...userInfo,
        ...newUserInfo,
      });
      notifyForError("Item Removed from Wishlist");
      return newWishList;
    } catch (error) {
      return rejectWithValue("Error wFhile deleting data from WatchList");
    }
  },
);

export const changingCountOfItem = createAsyncThunk<
  string,
  { mealId: string; type: number },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "miniBuyingList/changingCountOfItem",
  async ({ mealId, type }, { dispatch, rejectWithValue }) => {
    try {
      const userInfo = getLocalUserStrict();
      if (!userInfo) {
        return rejectWithValue("User not logged in");
      }
      const response = await localStorageUsers
        .get<UserInfoType>(`/${userInfo.id}`)
        .then((res) => {
          return res.data.wishList;
        });
      const result = response.map((elm) => {
        if (
          elm.id === mealId &&
          elm.count + type > 0 &&
          elm.count + type <= 10
        ) {
          elm.count += +type;
        }
        return elm;
      });
      let totalCount = result.reduce(
        (acc, elm) => acc + parseFloat(elm.price) * +elm.count,
        0,
      );
      let newUserInfo = {
        wishList: result,
        totalCheckPrice: totalCount.toFixed(3),
      };
      await patchingUserDataToLocal(userInfo.id, newUserInfo);
      setingLocalStorageUserinfo(dispatch, {
        ...userInfo,
        ...newUserInfo,
      });
      return "Success";
    } catch (error) {
      return rejectWithValue("Error Happened while  changing Count");
    }
  },
);
