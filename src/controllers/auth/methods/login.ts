import handleRequestError from 'helpers/handle-request-error';
import { RequestHandler } from 'express';
import credentialsValidationSchema from '../validation schemas/credentials-validation-schema';
import { Credentials, AuthResponse } from '../types';
import UserModel from '../../../models/user-model/index';
import BcryptService from '../../../services/bcrypt-service';
import createAuthResponse from '../helpers/create-auth-response';

const login: RequestHandler<
{},
AuthResponse | ErrorResponse,
Partial<Credentials>,
{}
> = async (req, res) => {
  try {
    const credentials = credentialsValidationSchema.validateSync(req.body, { abortEarly: false });

    const userEntity = await UserModel.getUserByEmail(credentials.email);

    const passwordIsCorrect = BcryptService.compare(credentials.password, userEntity.password);
    if (!passwordIsCorrect) throw new Error('invalid password');

    res.json(createAuthResponse(userEntity));
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default login;
