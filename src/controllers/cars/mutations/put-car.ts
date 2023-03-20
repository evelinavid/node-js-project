import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import { CarViewModel, CarDataBody } from '../types';
import carDataValidationScheme from '../validation-schemes/car-data-validation-scheme';
import CarModel from '../car-model/index';
import ForbiddenError from '../../../errors/forbidden-error';

const replaceCar: RequestHandler<
{ id?: string },
CarViewModel | ErrorResponse,
CarDataBody,
{}
> = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === undefined || req.authUser === undefined) throw new ServerSetupError();
    const carToUpdate = await CarModel.getCar(id);

    if (req.authUser.role !== 'ADMIN' && req.authUser.id !== carToUpdate.seller.id) {
      throw new ForbiddenError();
    }

    const carData = carDataValidationScheme.validateSync(req.body);
    const carViewModel = await CarModel.replaceCar(id, carData);

    res.status(200).json(carViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default replaceCar;
