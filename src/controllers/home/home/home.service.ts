import { Injectable, HttpService } from '@nestjs/common';
import { Appconstants } from '../../../app.constants';
import { BaseResponse } from '../../../data/base.response';
import { CategoryResponseModel } from '../../../data/responses/category.response';
import { AxiosRequestConfig } from 'axios';
import { map, flatMap, mergeMap} from 'rxjs/operators';
import { of, from } from 'rxjs';
import { HomeResponseModel, Promotion, FoodResponse } from '../../../data/responses/home.response';
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
        let response: BaseResponse = null;
        const result = this.httpService.post(Appconstants.getPromotionIds, body, config).pipe(
            map((x) => {
              return {
                promotion_ids: x.data.reply.promotion_ids.slice(0, x.data.reply.limit_count),
              };
            }),
            mergeMap((x) => {
              return this.httpService.post(Appconstants.getPromotionInfos, x, config);
            }),
            map((x) => {
                resultData.promotions = (x.data.reply.promotion_infos as any[]).map( val => ({
                    promotionTitle: val.restaurant_info.promotion_title,
                    address: val.restaurant_info.address,
                    name: val.restaurant_info.name,
                    deliveryId: val.restaurant_info.delivery_id,
                    code: val.code,
                    image: (val.restaurant_info.photos as any[])[1].value,
                } as Promotion));
            }),
            mergeMap((x) => {
                return this.httpService.post(Appconstants.getBrowsingIds, {
                    city_id: 217,
                    foody_service_id: [ 1 ],
                    sort_type: 30,
                }, config);
            }),
            map((x) => {
                return {
                    delivery_ids: x.data.reply.delivery_ids.slice(0, 8),
                };
            }),
            mergeMap((x) => {
                resultData.foods = [];
                return this.httpService.post(Appconstants.getBrowsingInfos, x, config);
            }),
            mergeMap((x) => {
                const ids: number[] = (x.data.reply.delivery_infos as any[]).map( val => val.delivery_id);
                return from(ids);
            }),
            mergeMap((id) => {
                return this.httpService.get(Appconstants.getMenus + id, config);
            }),
            map((it) => {
                const food = it.data.reply.menu_infos[0].dishes[0];
                resultData.foods.push({
                    name: food.name,
                    id: food.id,
                    description: food.description,
                    price: food.price as Price,
                    image: food.photos[1].value,
                } as FoodResponse);
            }),
        );
        result.subscribe({
            error: err => {
                console.error('error: ' + err);
                response = new BaseResponse(null, err, 500);
              },
              complete: () => {
                console.log('done');
                resultData.categories = Appconstants.categories.map( c => ({
                    category: c.name,
                    id: c.id,
                    url: c.url,
                } as CategoryResponseModel));
                response = new BaseResponse(resultData);
              },
        });
        return await result.toPromise().then( () => response);
    }
}
