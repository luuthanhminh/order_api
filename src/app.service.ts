import { Injectable, HttpService } from '@nestjs/common';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Store, Food } from './models';
import { Repository } from 'typeorm';
import { BaseResponse } from './data/base.response';
import { Appconstants } from './app.constants';
import { map, flatMap, mergeMap} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Store)
    private storeRepo: Repository<Store>,
    @InjectRepository(Food)
    private foodRepo: Repository<Food>,
  ) { }

  getHello(): string {
    return 'Running...';
  }
  async initDb(): Promise<boolean> {
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
      mergeMap((x) => {
        const data = x.data.reply.promotion_ids.slice(0, x.data.reply.limit_count);
        return of(data);
      }),
      mergeMap((x) => {
        return this.httpService.post(Appconstants.getPromotionInfos, x, config);
      }),
      mergeMap((x) => {
        return this.httpService.post(Appconstants.getPromotionInfos, x, config);
      }),
    );
    result.subscribe({
      next: async val => {
        console.log(val);
      },
      error: err => {
        console.error('error: ' + err);
      },
      complete: () => {
        console.log('done');
      },
    });
    // this.httpService.get(url, config).subscribe({
    //   next: async val => {
    //     console.log('next: ' + val);
    //     const delivery_detail = val.data.reply.delivery_detail;
    //     const store: Store = new Store();
    //     store.photos = JSON.stringify(delivery_detail.photos);
    //     store.address = delivery_detail.address;
    //     store.name = delivery_detail.name;
    //     store.deliveryId = delivery_detail.delivery_id;

    //     await this.storeRepo.save(store);
    //   },
    //   error: err => {
    //     console.error('error: ' + err);
    //   },
    //   complete: () => {
    //     console.log('done');
    //   },
    // });

    return true;
  }
}
