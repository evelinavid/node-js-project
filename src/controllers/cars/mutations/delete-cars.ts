import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'errors/server-setup-error';
import { CarViewModel } from '../types';
import CarModel from '../car-model/index';
import ForbiddenError from '../../../errors/forbidden-error';

const deleteCar: RequestHandler<
{ id?: string },
CarViewModel | ErrorResponse,
{},
{}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined || req.authUser === undefined) throw new ServerSetupError();
    const carViewModel = await CarModel.getCar(id);

    if (req.authUser.role !== 'ADMIN' && req.authUser.id !== carViewModel.seller.id) {
      throw new ForbiddenError();
    }

    await CarModel.deleteCar(id);

    res.status(200).json(carViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default deleteCar;
