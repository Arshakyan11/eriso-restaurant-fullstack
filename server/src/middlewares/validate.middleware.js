export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    const formattedErrors = error.issues.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));

    return res.status(400).json({
      message: "Validation error",
      errors: formattedErrors,
    });
  }
};
