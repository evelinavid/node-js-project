import * as yup from 'yup';
import { CarData } from '../types';

const carDataValidationSchema: yup.ObjectSchema<CarData> = yup.object({
    modelId: yup.number()
        .required('modelId is required'),

    featuresIds: yup.array(yup.number().required())
        .required('featuresIds are required'),
    images: yup
        .array(yup.string().required())
        .required('images are required'),

    price: yup.number()
        .required('price is required')
        .positive('price number must be positive')
        .moreThan(0, 'price cannot be negative')
        .test(
            'priceFormat',
            'price cannot have more than two decimal points',
            (value) => Number(value.toFixed(2)) === value,
        ),

    year: yup.number()
        .required('price is required')
        .positive('price number must be positive')
        .moreThan(0, 'price cannot be negative'),
})
.strict(true);
export default carDataValidationSchema;
