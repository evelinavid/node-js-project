Select 
	other.id,
    other.brand,
    other.model,
    other.features,
    other.seller,
    img.images,
    other.price,
    other.year
FROM
(Select
	c.carId as 'id',
	b.title as brand,
	m.title as model,
	json_object(
		'id', u.userId,
		'email', u.email,
		'name', u.name,
		'surname', u.surname,
		'phone', u.phone
	) as seller,
	c.price,
	c.year,
    json_objectagg(f.name, true) as features
From car c
Join user u
On c.userId = u.userId
Join model m
On c.modelId = m.modelId
Join brand b
On m.brandId = b.brandId
Join carfeature cf
On c.carId = cf.carId
Join feature f
On cf.featureId = f.featureId
group by c.carId) as other
join 
(Select
	json_arrayagg(i.src) as images,
    c.carId
from car c
Join image i
On i.carId = c.carId
Group By c.carId
) as img
on img.carId = other.id;
