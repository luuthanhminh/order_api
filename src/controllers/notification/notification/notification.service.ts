import { Injectable, HttpService } from '@nestjs/common';
import { BaseResponse } from '../../../data/base.response';
import { AxiosRequestConfig } from 'axios';
import { Appconstants } from '../../../app.constants';
import { map, flatMap, mergeMap, concatMap} from 'rxjs/operators';

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
        const result = this.httpService.post(Appconstants.getPromotionIds, body, config).pipe(
            map((x) => {
                return {
                  promotion_ids: x.data.reply.promotion_ids.slice(0, 10),
                };
              }),
        );
        return new BaseResponse(null, '', 500);
    }
}
