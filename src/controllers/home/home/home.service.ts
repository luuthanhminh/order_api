import { Injectable, HttpService } from '@nestjs/common';
import { Appconstants } from '../../../app.constants';
import { BaseResponse } from '../../../data/base.response';
import { CategoryResponseModel } from '../../../data/responses/category.response';
import { AxiosRequestConfig } from 'axios';
import { map, flatMap, mergeMap, concatMap} from 'rxjs/operators';
import { of, from } from 'rxjs';
import { HomeResponseModel, Promotion, FoodResponse, CategoryInfoResponseModel, Restaurant, PromotionInfo } from '../../../data/responses/home.response';
import { Price } from '../../../data/price';

@Injectable()
export class HomeService {
    constructor(
        private readonly httpService: HttpService,
    ) { }

    async getCategories(): Promise<BaseResponse> {
        const categories: CategoryResponseModel[] = [];
        Appconstants.categories.forEach(c => {
            categories.push({
                category: c.name,
                id: c.id,
                url: c.url,
            } as CategoryResponseModel);
        });
        return new BaseResponse(categories);
    }

    async getHomeInfo(): Promise<BaseResponse> {

        const config: AxiosRequestConfig = {
            headers: Appconstants.headers,
        };
        const body = {
            city_id: 217,
            foody_service_id: 1,
            sort_type: 0,
            promotion_status: 1,
        };
        const resultData = new HomeResponseModel();
        let restaurants = [];
        const result = this.httpService.post(Appconstants.getPromotionIds, body, config).pipe(
            map((x) => {
              return {
                promotion_ids: x.data.reply.promotion_ids.slice(0, 10),
              };
            }),
            mergeMap((x) => {
              return this.httpService.post(Appconstants.getPromotionInfos, x, config).pipe(
                map((it) => {
                    resultData.promotions = (it.data.reply.promotion_infos as any[]).map( val => ({
                        promotionTitle: val.restaurant_info.promotion_title,
                        address: val.restaurant_info.address,
                        name: val.restaurant_info.name,
                        deliveryId: val.restaurant_info.delivery_id,
                        code: val.code,
                        image: (val.restaurant_info.photos as any[])[8].value,
                        cuisines: (val.restaurant_info.cuisines as any[]).join(' & '),
                    } as Promotion));
                }),
              );
            }),
            mergeMap((x) => {
                return this.httpService.post(Appconstants.getBrowsingIds, {
                    city_id: 217,
                    foody_service_id: [ 1 ],
                    sort_type: 30,
                }, config).pipe(
                    map((it) => {
                        return {
                            delivery_ids: it.data.reply.delivery_ids.slice(0, 10),
                        };
                    }),
                );
            }),
            mergeMap((x) => {
                return this.httpService.post(Appconstants.getBrowsingInfos, x, config);
            }),
            mergeMap((x) => {
                const ids: number[] = (x.data.reply.delivery_infos as any[]).map( val => val.delivery_id);
                restaurants = (x.data.reply.delivery_infos as any[]).map( val => ({
                    delivery_id: val.delivery_id,
                    restaurantName: val.name,
                    restaurantImage: val.photos[5].value,
                    restaurantCuisines: (val.cuisines as []).join(' & '),
                }));
                resultData.foods = [];
                return from(ids);
            }),
            mergeMap((id) => {
                const restaurant = restaurants.filter((element, index, array) => {
                    return (element.delivery_id === id);
                })[0];
                return this.httpService.get(Appconstants.getMenus + id, config).pipe(
                    map((it) => {
                        const food = it.data.reply.menu_infos[0].dishes[0];
                        resultData.foods.push({
                            name: food.name,
                            id: food.id,
                            description: food.description,
                            price: food.price as Price,
                            image: food.photos[2].value,
                            restaurantName: restaurant.restaurantName,
                            restaurantImage: restaurant.restaurantImage,
                            restaurantCuisines: restaurant.restaurantCuisines,
                        } as FoodResponse);
                    }),
                );
            }),
        );
        return await result.toPromise().then( () => {
            resultData.categories = Appconstants.categories.map(c => ({
                id: c.id.toString(),
                category: c.name,
                url: c.url,
            }) as CategoryResponseModel);
            return new BaseResponse(resultData);
        });
    }

    async getCategoryInfo(catId: number): Promise<BaseResponse> {
        const config: AxiosRequestConfig = {
            headers: Appconstants.headers,
        };

        const resultData = new CategoryInfoResponseModel();
        let restaurants = [];
        const body = {
            category_group: 1,
            city_id: 217,
            combine_categories: Appconstants.categories.find(c => c.id = catId).subCategories.map(val => ({
                code: 1,
                id: val,
            })),
            delivery_only: true,
            foody_services: [1],
            full_restaurant_ids: true,
            keyword: '',
            sort_type: 8,
        };
        const result = this.httpService.post(Appconstants.searchGlobal, body, config).pipe(
            map((x) => {
                return {
                    restaurant_ids: x.data.reply.search_result[0].restaurant_ids.slice(0, 10),
                };
            }),
            mergeMap((x) => {
                return this.httpService.post(Appconstants.getInfoUrl, x, config).pipe(
                    map((it) => {
                        resultData.restaurants = (it.data.reply.delivery_infos as any[]).map( val => ({
                            promotions: (val.promotion_groups as any[]).map( p => ({
                                text: p.text,
                                image: p.icon,
                            }) as PromotionInfo),
                            address: val.address,
                            name: val.name,
                            deliveryId: val.delivery_id,
                            priceRange: '~' + val.price_range.resource_args[0],
                            image: (val.photos as any[])[8].value,
                            cuisines: (val.cuisines as any[]).join(' & '),
                        } as Restaurant));
                    }),
                );
            }),
            mergeMap((x) => {
                body.sort_type = 2;
                return this.httpService.post(Appconstants.searchGlobal, body, config).pipe(
                    map((it) => {
                        return {
                            restaurant_ids: it.data.reply.search_result[0].restaurant_ids.slice(0, 10),
                        };
                    }),
                );
            }),
            mergeMap((x) => {
                return this.httpService.post(Appconstants.getInfoUrl, x, config);
            }),
            mergeMap((x) => {
                const ids: number[] = (x.data.reply.delivery_infos as any[]).map( val => val.delivery_id);
                restaurants = (x.data.reply.delivery_infos as any[]).map( val => ({
                    delivery_id: val.delivery_id,
                    restaurantName: val.name,
                    restaurantImage: val.photos[5].value,
                    restaurantCuisines: (val.cuisines as []).join(' & '),
                }));
                resultData.foods = [];
                return from(ids);
            }),
            mergeMap((id) => {
                const restaurant = restaurants.filter((element, index, array) => {
                    return (element.delivery_id === id);
                })[0];
                return this.httpService.get(Appconstants.getMenus + id, config).pipe(
                    map((it) => {
                        const food = it.data.reply.menu_infos[0].dishes[0];
                        resultData.foods.push({
                            name: food.name,
                            id: food.id,
                            description: food.description,
                            price: food.price as Price,
                            image: food.photos[2].value,
                            restaurantName: restaurant.restaurantName,
                            restaurantImage: restaurant.restaurantImage,
                            restaurantCuisines: restaurant.restaurantCuisines,
                        } as FoodResponse);
                    }),
                );
            }),
        );
        return await result.toPromise().then( () => new BaseResponse(resultData));
    }
}
