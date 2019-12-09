import { CategoryResponseModel } from './category.response';
import { Price } from '../price';

export class HomeResponseModel {

    promotions: Promotion[];
    categories: CategoryResponseModel[];
    foods: FoodResponse[];
}
// tslint:disable-next-line:max-classes-per-file
export class CategoryInfoResponseModel {
    restaurants: Restaurant[];
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
    cuisines: string;
}
// tslint:disable-next-line:max-classes-per-file
export class PromotionInfo {
    text: string;
    image: string;
}

// tslint:disable-next-line:max-classes-per-file
export class Restaurant {
    promotions: PromotionInfo[];
    image: string;
    address: string;
    name: string;
    deliveryId: number;
    priceRange: string;
    cuisines: string;
}
// tslint:disable-next-line:max-classes-per-file
export class FoodResponse {
    id: number;
    description: string;
    image: string;
    name: string;
    price: Price;
    restaurantName: string;
    restaurantCuisines: string;
    restaurantImage: string;
}
