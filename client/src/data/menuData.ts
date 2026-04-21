import type { CategoriesType, priceChangesType } from "../types";

export const mealTime: CategoriesType = [
  "BreakFast",
  "Brunch",
  "Lunch",
  "Dinner",
];

export const topCategories: CategoriesType = [
  "sushi",
  "pizza",
  "soups",
  "bbq",
  "pasta",
  "steaks",
  "burger",
  "salads",
];
export const dessertsAndDrinks: CategoriesType = [
  "cake",
  "milkshakes",
  "lemonade",
];

export const priceRanges: priceChangesType[] = [
  { label: "up to 5$", min: 0, max: 5 },
  { label: "6$ - 10$", min: 6, max: 10 },
  { label: "11$ - 20$", min: 11, max: 20 },
  { label: "21$ - 30$", min: 21, max: 30 },
  { label: "31$ - 40$", min: 31, max: 40 },
  { label: "41$ - 50$", min: 41, max: 50 },
  { label: "51$ and more", min: 51, max: 1000 },
];
