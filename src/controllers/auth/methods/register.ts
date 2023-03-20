import handleRequestError from 'helpers/handle-request-error';
import { RequestHandler } from 'express';
import registrationBodyValidationSchema from '../validation schemas/registration-body-validation-schema';
import { RegistrationBody, AuthResponse } from '../types';
import UserModel from '../../../models/user-model/index';
import createAuthResponse from '../helpers/create-auth-response';

const register: RequestHandler<
{},
AuthResponse | ErrorResponse,
Partial<RegistrationBody>,
{}
> = async (req, res) => {
  try {
    const {
      passwordConfirmation,
      ...userData
    } = registrationBodyValidationSchema.validateSync(req.body, { abortEarly: false });

    await UserModel.checkEmail(userData.email);
    const userEntity = await UserModel.createUser(userData);

    res.json(createAuthResponse(userEntity));
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default register;
