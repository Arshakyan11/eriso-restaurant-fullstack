import { z } from "zod";

export const wishlistSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  price: z.coerce
    .number()
    .min(1, "Price must be greater than 0")
    .max(10000, "Price must be less than 10000"),
  calories: z.coerce.number().min(0, "Calories cannot be negative"),
  img: z.string().url("Pls provide a valid image URL"),
  count: z.coerce.number().min(1, "Minimum 1 item").max(10, "Maximum 10 items"),
});
