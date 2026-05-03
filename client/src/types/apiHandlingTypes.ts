export interface EdamamHit {
  recipe: {
    label: string;
    calories: number;
    ingredients: IngredientsType[];
    images: {
      REGULAR: {
        url: string;
      };
    };
  };
}

export interface EdamamHitForSearch extends EdamamHit {
  recipe: EdamamHit["recipe"] & {
    cuisineType: string[];
    dietLabels: string[];
    mealType: string[];
    calories: number;
    totalWeight: number;
  };
}

interface IngredientsType {
  food: string;
  foodCategory: string;
  foodId: string;
  image: string;
  measure: string;
  quantity: number;
  text: string;
  weight: number;
}
export interface DataOflittleMenuType {
  mealId: string;
  label: string;
  ingredients: IngredientsType[];
  price: string;
  starrArr: number[];
  image: string;
  totalWeight?: number;
  calories: number;
}

export interface EdamamHitForWishListSedningType {
  mealId: string;
  label: string;
  price: string;
  calories: number;
  count: number;
  image: string;
}

export type DataOfSearchingMenuType = Pick<
  EdamamHitForSearch["recipe"],
  "cuisineType" | "dietLabels" | "mealType" | "calories" | "totalWeight"
> &
  DataOflittleMenuType;

export interface WishList {
  id: string;
  img: string;
  name: string;
  price: string;
  count: number;
  calories: number;
}

export interface AddingWishlistResponse {
  message: string;
  wishList: WishList[];
  totalCheckPrice: Number;
}


export interface ReservationType {
  address: string;
  date: string;
  count: string;
  tableType: string;
}
export interface UserInfoType {
  email: string;
  id: string;
  password: string;
  phoneNumber: string;
  totalCheckPrice: Number;
  userName: string;
  wishList: WishList[];
  reservation?: ReservationType;
}
