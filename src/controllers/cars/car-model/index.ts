import mysql from 'mysql2/promise';
import CarNotFoundError from '../car-not-found-error';
import SELECT from './sql';
import { CarViewModel, CarData } from '../types';
import config from '../../../config/index';

const getCars = async (): Promise<CarViewModel[]> => {
  const connection = await mysql.createConnection(config.database);
  const sql = SELECT;

  const [queryResult] = await connection.query(sql);

  connection.end();
  return queryResult as CarViewModel[];
};

const getCar = async (id: string): Promise<CarViewModel> => {
  const connection = await mysql.createConnection(config.database);
  const preparedSql = `
    ${SELECT}
    where other.id = ?;
    `;

  const bindings = [id];
  const [cars] = await connection.query<mysql.RowDataPacket[]>(preparedSql, bindings);
  if (cars.length === 0) throw new CarNotFoundError(id);
  connection.end();

  return cars[0] as CarViewModel;
};

const deleteCar = async (id: string): Promise<void> => {
  const connection = await mysql.createConnection(config.database);
  const preparedSql = `
    Delete from carFeature
    Where carId = ?;
    
    Delete from image
    Where carId = ?;
    
    Delete from car 
    Where carId = ?;
    `;
  const bindings = [id, id, id];
  await connection.query(preparedSql, bindings);
  connection.end();
};

const createCar = async (carData: CarData, userId:number): Promise<CarViewModel> => {
  const connection = await mysql.createConnection(config.database);

  const preparedSql = `
    insert into car (year, price, modelId, userId) values
    (?, ?, ?, ?);

    set @created_car_id = last_insert_id(); 

    insert into image (src, carId) values
    ${carData.images.map(() => '(?,  @created_car_id)').join(',\n')};

    insert into carFeature (carId, featureId) values
    ${carData.featuresIds.map(() => '(@created_car_id, ?)').join(',\n')};
    ${SELECT}
    where carId = @created_car_id;
    `;
  const bindings = [
    carData.year,
    carData.price,
    carData.modelId,
    userId,
    ...carData.images,
    ...carData.featuresIds,
  ];
  const [queryResult] = await connection.query<mysql.RowDataPacket[]>(preparedSql, bindings);

  const [car] = queryResult[queryResult.length - 1] as CarViewModel[];

  connection.end();

  return car;
};

const replaceCar = async (carId: string, carData: CarData): Promise<CarViewModel> => {
  const connection = await mysql.createConnection(config.database);

  const preparedSql = `
    update car 
    set price = ?, year = ?, modelId = ?, userId = 4
    where carId = ?;

    delete from image
    where carId = ?;

    insert into image (src, carId) values
     ${carData.images.map(() => '(?, ?)').join(',\n')};

    delete from carFeature
    where carId = ?;

    insert into carFeature (carId, featureId) values
    ${carData.featuresIds.map(() => '(?, ?)').join(',\n')};

    ${SELECT}
    where carId = ?;
    `;
  const bindings = [
    carData.price,
    carData.year,
    carData.modelId,
    carId,
    carId,
    ...carData.images.map((image) => [image, carId]).flat(),
    carId,
    ...carData.featuresIds.map((feature) => [carId, feature]).flat(),
    carId,

  ];

  const [queryResult] = await connection.query<mysql.RowDataPacket[]>(preparedSql, bindings);

  const [car] = queryResult[queryResult.length - 1] as CarViewModel[];

  connection.end();

  return car;
};

const CarModel = {
  getCars,
  getCar,
  deleteCar,
  createCar,
  replaceCar,
};

export default CarModel;
