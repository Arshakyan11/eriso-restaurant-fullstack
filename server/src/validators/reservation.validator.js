import z from "zod";

export const reservationSchema = z.object({
  address: z.string().min(2, "Pls write more than 1 symbol"),
  date: z.string().min(2, "Pls write more than 1 symbol"),
  count: z.coerce
    .number()
    .min(2, "Minimum 2 people")
    .max(32, "Maximum 32 people"),
  tableType: z.string().min(2, "Pls write more than 1 symbol"),
});
