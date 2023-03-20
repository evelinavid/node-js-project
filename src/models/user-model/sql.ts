const SELECT = `
select 
u.userId as id,
u.email,
u.password,
u.name,
u.surname, 
u.phone,
u.role
from user u`;

const SQL = {
  SELECT,
};

export default SQL;
