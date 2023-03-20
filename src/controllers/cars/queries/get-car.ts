import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import { CarViewModel } from '../types';
import CarModel from '../car-model/index';

const getCar: RequestHandler<
  { id?: string },
  CarViewModel | ErrorResponse,
  undefined
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) { throw new Error('Server setup error'); }
    const carViewModel = await CarModel.getCar(id);
    res.json(carViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default getCar;
