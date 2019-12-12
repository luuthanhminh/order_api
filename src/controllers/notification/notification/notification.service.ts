import { Injectable, HttpService } from '@nestjs/common';
import { BaseResponse } from '../../../data/base.response';
import { AxiosRequestConfig } from 'axios';
import { Appconstants } from '../../../app.constants';
import { map, flatMap, mergeMap, concatMap} from 'rxjs/operators';
import { NotificationResponse } from '../../../data/responses/notification.response';

@Injectable()
export class NotificationService {
    constructor(
        private readonly httpService: HttpService,
    ) { }

    async getPromotionNotificaton(): Promise<BaseResponse> {
        const config: AxiosRequestConfig = {
            headers: Appconstants.headers,
        };
        const body = {
            city_id: 217,
            foody_service_id: 1,
            sort_type: 0,
            promotion_status: 1,
        };
        let resultData: NotificationResponse[] = [];
        const result = this.httpService.post(Appconstants.getPromotionIds, body, config).pipe(
            map((x) => {
                return {
                  promotion_ids: x.data.reply.promotion_ids.slice(0, x.data.reply.limit_count),
                };
              }),
              mergeMap((x) => {
                return this.httpService.post(Appconstants.getPromotionInfos, x, config).pipe(
                  map((it) => {
                      resultData = (it.data.reply.promotion_infos as any[]).map( val => ({
                            message: `<p style='line-height:1.4'>${val.plain_title}<br><b style='color:#ff0000'>${val.code}</b></br></p>`,
                            icon: val.restaurant_info.promotion_groups[0].icon,
                            uuid: val.restaurant_info.delivery_id,
                            createdDate: val.end_date,
                      } as NotificationResponse));
                  }),
                );
              }),
        );
        return await result.toPromise().then(() => new BaseResponse(resultData));
    }
}
