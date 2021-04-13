import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';

export class PokeApi extends BaseApi {
  api: HttpClient;

  constructor(api: HttpClient, config: any) {
    super(config);
    this.api = api;
  }

  list(offset): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get(`${this.configService.get('baseUrl')}/pokemon?offset=${offset}&limit=25`).subscribe(
        (res: any) => resolve(res),
        (err: any) => reject(err)
      );
    });
  }
}
