import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyToken = (req, res, next) => {
  console.log("Headers yang diterima", req.headers);
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Silakan login terlebih dahulu" });
  }

  try {
    const secret = process.env.JWT_SECRET || 'secret_key';
    const decoded = jwt.verify(token, secret); 
    
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });
  }
};

export default verifyToken;