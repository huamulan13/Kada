import jwt from 'jsonwebtoken';
const secret = 'secret_key';

export const loginRequired = (req, res, next) => {
  const token = req.cookies.token; 
  
  if (!token) {
    return res.status(401).json({ message: "Silakan login terlebih dahulu" });
  }

  try {
    const user = jwt.verify(token, 'secret_key'); 
    req.user = user; 
    next();
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid" });
  }
};