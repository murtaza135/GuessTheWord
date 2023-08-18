import jwt from 'jsonwebtoken';
import config from '../../config/config';

function generateAccessToken(userId: number) {
  return jwt.sign(
    { userId },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: config.ACCESS_TOKEN_EXPIRE_TIME },
  );
}

const authServices = {
  generateAccessToken
};

export default authServices;
