import jwt from "jsonwebtoken";
import { ENV } from "../constant/index.js"

export const generateTokenJWT = (id) => {
    return jwt.sign({ id }, ENV.JWT_SECRET, { expiresIn: '7d' });
} 