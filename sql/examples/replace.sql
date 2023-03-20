update car 
set price = 9999, year = 2001, modelId = 4, userId = 2
where carId = 10;

delete from image
where carId = 10;

insert into image (src, carId) values
('nuotrauka2', 10),
('nuotrauka4',10);

delete from carFeature
where carId = 10;

insert into carFeature (carId, featureId) values
(10, 1),
(10, 3);
