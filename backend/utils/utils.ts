//
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
export const auth = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("-"))
    .update(process.env.SECRET as string)
    .digest("hex");
};
export const random = () => crypto.randomBytes(128).toString("base64");
