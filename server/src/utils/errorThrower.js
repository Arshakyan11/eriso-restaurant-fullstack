export const errorThrower = (text, status = 400) => {
  const err = new Error(text);
  err.status = status;
  throw err;
};
