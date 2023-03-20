import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'errors/server-setup-error';
import { CarViewModel, CarDataBody } from '../types';
import carDataValidationScheme from '../validation-schemes/car-data-validation-scheme';
import CarModel from '../car-model/index';

const createCar: RequestHandler<
{},
CarViewModel | ErrorResponse,
CarDataBody,
{}
> = async (req, res) => {
  try {
    if (req.authUser === undefined) throw new ServerSetupError();
    const carData = carDataValidationScheme.validateSync(req.body, { abortEarly: false });

    const carViewModel = await CarModel.createCar(carData, req.authUser.id);

    res.status(201).json(carViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default createCar;

// RequestHandler PARAMETRAI:
// 1.router parametrai
// 2.uklausos grazinimo tipas
// 3.body tipas
// 4.query parametru tipas
// 5.user settings tipas
// > =(req, res) => {}};
