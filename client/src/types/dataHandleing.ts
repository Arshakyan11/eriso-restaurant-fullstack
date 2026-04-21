export interface RestaurantChefsType {
  name: string;
  position: string;
  country: string;
  img: string;
  description: string;
}

export interface CustomersReviewType {
  id: number;
  nickname: string;
  img: string;
  comment: string;
}

export type CuisinesType = {
  cuisine: string;
  img: string;
  info: string;
};

export interface EachRestaurantType {
  id: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  workingTime: string;
  city: string;
  info: string;
  iframeLink: string;
  images: [string, string, string, string];
}

export type CategoriesType = string[];

export interface priceChangesType {
  label: string;
  min: number;
  max: number;
}

export interface FilteringMenu {
  min: number;
  max: number;
  filterArg?: boolean;
}
