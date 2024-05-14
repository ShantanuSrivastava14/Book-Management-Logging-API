import jwt from "jsonwebtoken";

export const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
