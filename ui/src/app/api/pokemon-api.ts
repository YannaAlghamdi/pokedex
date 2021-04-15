import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { ListOpts } from '../models/list-opts';

export class PokeApi extends BaseApi {
  api: HttpClient;

  constructor(api: HttpClient, config: any) {
    super(config);
    this.api = api;
  }

  list(options: ListOpts): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get(`${this.configService.get('baseUrl')}/pokemon?offset=${options.getOffset()}&limit=${options.getLimit()}`).subscribe(
        (res: any) => resolve(res),
        (err: any) => reject(err)
      );
    });
  }

  get(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get(`${this.configService.get('baseUrl')}/pokemon/${name}`).subscribe(
        (res: any) => resolve(res),
        (err: any) => reject(err)
      );
    });
  }

  getFromUrl(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get(url).subscribe(
        (res: any) => resolve(res),
        (err: any) => reject(err)
      );
    });
  }
}
