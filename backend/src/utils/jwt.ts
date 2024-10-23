import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../interfaces/api.interfaces";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export const verifyToken = (token: string): CustomJwtPayload => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as CustomJwtPayload;
  return decoded;
};
