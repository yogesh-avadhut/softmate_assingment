
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "aabra_ka_dabhra";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";


export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};


export const verifyToken = (token: any) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch {
    return null; 
  }
};
