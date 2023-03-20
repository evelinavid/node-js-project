import { PartialRecursive } from 'types/ts-helpers';

export type CarViewModel = {
  id: number,
  brand: string,
  model: string,
  seller: {
    id:number,
    name: string,
    surname: string,
    phone: string,
    email: string,
  }
  features: {
    SunroofMoonroof?: boolean,
    HeatedSeats?: boolean,
    BackupCamera?: boolean,
    NavigationSystem?: boolean
  },
  images: string[],
  price: number,
  year: number
};

export type CarData = Omit<CarViewModel, 'id' | 'brand' | 'seller' | 'model' | 'features'> & {
  modelId: number,
  featuresIds: number[]
};
export type CarDataBody = PartialRecursive<CarData>;
export type PartialCarData = Partial<CarData>;
