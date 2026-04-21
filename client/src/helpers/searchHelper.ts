import type { ChangeEvent } from "react";
import { fetchingSearchMenu } from "../store/api/api";
import { clearFoundedData } from "../store/SearchSlice/SearchSlice";
import type { AppDispatch } from "../store/store";

export const searchHelper = (
  dispatch: AppDispatch,
  event: ChangeEvent<HTMLInputElement>,
): void => {
  const query = event.target.value.trim();
  const allowedCharacters = /^[a-zA-Z0-9\s]+$/.test(query);
  if (query.length > 1 && allowedCharacters) {
    dispatch(fetchingSearchMenu(query));
  } else {
    dispatch(clearFoundedData());
  }
};
