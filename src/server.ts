import express from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import carsRouter from './controllers/cars';
import DBService from './services/db-service';
import authController from './controllers/auth/index';

const server = express();
server.use(cors());
server.use(express.json());
server.use(morgan('tiny'));
server.use(express.static('public'));

server.use('/api/cars', carsRouter);
server.use('/api/auth', authController);

DBService.connect(() => {
  server.listen(config.server.port, () => {
  console.log(`Server is running on ${config.server.address}`);
});
});
