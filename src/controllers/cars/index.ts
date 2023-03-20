import express from 'express';
import getCars from './queries/get-cars';
import getCar from './queries/get-car';
import createCar from './mutations/create-car';
import deleteCar from './mutations/delete-cars';
import replaceCar from './mutations/put-car';
// import updateCar from './mutations/patch-car';
import JwtTokenMiddleware from '../../middlewares/jwt-token-middleware';

const carsRouter = express.Router();

// get all
carsRouter.get('/', getCars);

// get all by id
carsRouter.get('/:id', getCar);

// create one
carsRouter.post('/', JwtTokenMiddleware, createCar);

// replace one
carsRouter.put('/:id', JwtTokenMiddleware, replaceCar);

// carsRouter.patch('/:id', updateCar);

// delete one
carsRouter.delete('/:id', JwtTokenMiddleware, deleteCar);

export default carsRouter;
