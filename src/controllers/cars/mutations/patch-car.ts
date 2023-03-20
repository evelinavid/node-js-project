// import { RequestHandler } from 'express';
// import handleRequestError from 'helpers/handle-request-error';
// import ServerSetupError from 'errors/server-setup-error';
// import CarNotFoundError from '../car-not-found-error';
// import { CarViewModel, CarDataBody } from '../types';
// import PartialCarDataValidationScheme from '../validation-schemes/partial-car-data-validation-schema';

// const updateCar: RequestHandler<
//     { id?: string },
//     CarViewModel | ErrorResponse,
//     CarDataBody,
//     {}
// > = (req, res) => {
//     const { id } = req.params;

//     try {
//         if (id === undefined) throw new ServerSetupError();
//         const carData = PartialCarDataValidationScheme.validateSync(req.body);
//         const foundCar = cars.find((car) => String(car.id) === id);

//         if (foundCar === undefined) throw new CarNotFoundError(id);

//         Object.assign(foundCar, carData);

//         res.status(200).json(foundCar);
//     } catch (error) {
//         handleRequestError(error, res);
//     }
// };

// export default updateCar;
