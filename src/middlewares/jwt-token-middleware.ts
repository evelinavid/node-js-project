import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import UnauthorizedError from '../errors/unauthorized-error';
import JwtTokenService from '../services/jwt-token-service';
import UserModel from '../models/user-model/index';

const JwtTokenMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) throw new UnauthorizedError();

    const token = authorization.split(' ').pop();
    if (token === undefined) throw new UnauthorizedError();

    const authData = JwtTokenService.decode(token);
    if (authData === null) throw new UnauthorizedError();

    const currentTimestamp = Math.floor(new Date().getTime());
    if (currentTimestamp > authData.exp) throw new UnauthorizedError();

    req.authUser = await UserModel.getUserByEmail(authData.email);
    next();
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default JwtTokenMiddleware;
