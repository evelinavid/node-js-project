import { RequestHandler } from 'express';
import { CarViewModel } from '../types';
import CarModel from '../car-model/index';

const getCars: RequestHandler<
  {},
  CarViewModel[],
  undefined,
  {}
> = async (_req, res) => {
const carsViewModel = await CarModel.getCars();
  res.json(carsViewModel);
};

export default getCars;
