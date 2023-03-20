insert into car (year, price, modelId, userId) values
('2014', 15000, 2, 1);

set @created_car_id = last_insert_id(); 

insert into image (src, carId) values
('nuotrauka1', @created_car_id),
('nuotrauka2', @created_car_id),
('nuotrauka3', @created_car_id),
('nuotrauka4', @created_car_id);


insert into carFeature (carId, featureId) values
(@created_car_id, 2),
(@created_car_id, 4);