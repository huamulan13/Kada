import jwt from 'jsonwebtoken';

const secret = 'secret_key';

export const setUserToken = (res, user) => {
  const payload = { _id: user._id, email: user.email, name: user.name }; 
  const token = jwt.sign(payload, secret);

  res.cookie('token', token, { httpOnly: true }); 
};