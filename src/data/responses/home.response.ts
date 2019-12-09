import { CategoryResponseModel } from './category.response';
import { Price } from '../price';

export class HomeResponseModel {

    promotions: Promotion[];
    categories: CategoryResponseModel[];
    foods: FoodResponse[];
}

// tslint:disable-next-line:max-classes-per-file
export class Promotion {
    promotionTitle: string;
    image: string;
    address: string;
    name: string;
    deliveryId: number;
    code: string;
}
// tslint:disable-next-line:max-classes-per-file
export class FoodResponse {
    id: number;
    description: string;
    image: string;
    name: string;
    price: Price;
}
