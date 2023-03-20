import mysql from 'mysql2/promise';
import NotFoundError from 'errors/not-found-error';
import { UserData } from '../../controllers/auth/types';
import config from '../../config/index';
import SQL from './sql';
import BcryptService from '../../services/bcrypt-service';

const checkEmail = async (email: string): Promise<true> => {
  const connection = await mysql.createConnection(config.database);
  const preparedSQL = `
select 1
from user
where email = ?`;

  const bindings = [email];
  const [rows] = await connection.query<mysql.RowDataPacket[]>(preparedSQL, bindings);
  connection.end();

  if (rows.length > 0) throw new Error(`Email ${email} is taken`);

  return true;
};

const createUser = async (userData: UserData): Promise<UserEntity> => {
  const connection = await mysql.createConnection(config.database);
  const prepareSQL = `
insert into user (email, password, name, surname, phone) value 
(?, ?, ?, ?, ?);

${SQL.SELECT}
where u.userId = last_insert_id();
`;

  const bindings = [
    userData.email,
    BcryptService.encrypt(userData.password),
    userData.name,
    userData.surname,
    userData.phone,
  ];

  const [queryResult] = await connection.query<mysql.RowDataPacket[][]>(prepareSQL, bindings);
  const [user] = queryResult[queryResult.length - 1] as UserEntity[];

  connection.end();
  return user;
};

const getUserByEmail = async (email: string): Promise<UserEntity> => {
  const connection = await mysql.createConnection(config.database);
  const preparedSQL = `
${SQL.SELECT}
where email = ?`;

  const bindings = [email];
  const [users] = await connection.query<mysql.RowDataPacket[]>(preparedSQL, bindings);
  connection.end();

  if (users.length === 0) throw new NotFoundError(` user with ${email} is not found`);

  return users[0] as UserEntity;
};

const UserModel = {
  checkEmail,
  getUserByEmail,
  createUser,
};

export default UserModel;
