import * as yup from 'yup';
import { PartialCarData } from '../types';

const PartialCarDataValidationScheme: yup.ObjectSchema<PartialCarData> = yup.object({
    modelId: yup.number(),

    featuresIds: yup.array(yup.number().required()),

    images: yup
        .array(yup.string().required()),

    price: yup.number()
        .positive('price number must be positive')
        .moreThan(0, 'price cannot be negative')
        .test(
            'priceFormat',
            'price cannot have more than two decimal points',
            (value) => value === undefined || Number(value.toFixed(2)) === value,
        ),

    year: yup.number()
        .positive('price number must be positive')
        .moreThan(0, 'price cannot be negative'),
})
    .strict(true);
export default PartialCarDataValidationScheme;
