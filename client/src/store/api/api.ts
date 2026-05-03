import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notifyForSMth } from "../../helpers/notifyUser";
import { nanoid } from "nanoid";
import { setUserInfo } from "../AuthSlice/AuthSlice";
import type {
  AddingWishlistResponse,
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
  CreateUserDataType,
  ReserveTableInfoType,
  SignInDataRecievingType,
  UpdateDataOnProfileType,
} from "../../types/formTypes";
import type { AppDispatch } from "../store";
import {
  spreedProperties,
  spreedPropertiesWidely,
} from "../../helpers/sendData";
import { extractErrorMessage } from "../../services/instance";
import {
  changePasswordApi,
  loginUserApi,
  registerUserApi,
} from "../../services/auth.service";
import {
  deleteReservationApi,
  makeReservationApi,
} from "../../services/reservation.service";
import {
  addToWishlistpi,
  deleteItemFromWishlist,
  editCountOfItemApi,
} from "../../services/wishlist.service";

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
  baseURL: "http://localhost:8000/auth/signupMessage",
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
  baseURL: "http://localhost:8000/auth/signup",
  timeout: 10000,
  timeoutErrorMessage: "Too much time for fetching data",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setingLocalStorageUserinfo = (
  dispatch: AppDispatch,
  data: UserInfoType,
) => {
  localStorage.setItem("userInfo", JSON.stringify(data));
  dispatch(setUserInfo(data));
};

const patchingUserDataToLocal = (id: string, data: Partial<UserInfoType>) => {
  return axios.patch(`http://localhost:8000/auth/signup/${id}`, data, {
    timeout: 10000,
    timeoutErrorMessage: "Too much time for fetching data",
  });
};

export const registerUser = createAsyncThunk<
  string,
  CreateUserDataType,
  { rejectValue: string }
>("registration/registerUser", async (data, { rejectWithValue }) => {
  try {
    await registerUserApi(data);
    return "Account Registered Successfuly";
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Cant Add User to list, PLs try again later"),
    );
  }
});

export const loginUser = createAsyncThunk<
  SignInDataRecievingType,
  CheckingUserType,
  { rejectValue: string }
>("login/loginUser", async (data, { rejectWithValue }) => {
  try {
    const res = await loginUserApi(data);
    // const { email, password } = data;
    // dispatch(setEmailManualy(email));
    // dispatch(setUserInfoManualy(lastResult));
    // dispatch(setUserInfo(lastResult));
    return res;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "User not found!!!"));
  }
});

export const addingReserveTable = createAsyncThunk<
  { message: string },
  ReserveTableInfoType,
  { rejectValue: string; dispatch: AppDispatch }
>("reservation/addingReserveTable", async (obj, { rejectWithValue }) => {
  try {
    const result = await makeReservationApi(obj);
    return result;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(
        error,
        "Someting went wrong while adding reservation!",
      ),
    );
  }
});

export const deletingReservationTime = createAsyncThunk<
  UserInfoType,
  void,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "reservation/deletingReservationTime",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await deleteReservationApi();
      const userInfo = getLocalUserStrict();
      if (!userInfo) {
        return rejectWithValue("User not logged in");
      }
      const updatedData: UserInfoType = {
        ...userInfo,
      };
      delete updatedData.reservation;
      localStorage.setItem("userInfo", JSON.stringify(updatedData));
      dispatch(setUserInfo(updatedData));
      return updatedData;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Error while deleting Reservation"),
      );
    }
  },
);

export const updatingProfileInformation = createAsyncThunk<
  { message: string },
  UpdateDataOnProfileType,
  { rejectValue: string; dispatch: AppDispatch }
>("profile/updatingProfileInformation", async (data, { rejectWithValue }) => {
  try {
    const result = await changePasswordApi(data);
    return result;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Error while changing password"),
    );
  }
});

export const addingWishlistToData = createAsyncThunk<
  AddingWishlistResponse,
  WishList,
  { rejectValue: string; dispatch: AppDispatch }
>("wishlist/addingWishlistToData", async (wishObj, { rejectWithValue }) => {
  try {
    const result = await addToWishlistpi(wishObj);
    return result;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Error while adding Wishlist"),
    );
  }
});

export const deleteWishListFromData = createAsyncThunk<
  AddingWishlistResponse,
  string,
  { rejectValue: string; dispatch: AppDispatch }
>("wishlist/deleteWishListFromData", async (mealId, { rejectWithValue }) => {
  try {
    const response = await deleteItemFromWishlist(mealId);
    return response;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Error wFhile deleting data from WatchList"),
    );
  }
});

export const changingCountOfItem = createAsyncThunk<
  AddingWishlistResponse,
  { mealId: string; type: string },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "miniBuyingList/changingCountOfItem",
  async ({ mealId, type }, { rejectWithValue }) => {
    try {
      const result = await editCountOfItemApi(mealId, type);
      return result;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Error wFhile changing Count of item"),
      );
    }
  },
);
