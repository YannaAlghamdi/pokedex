import { BaseApi } from '../api/base-api';
import { HttpClient } from '@angular/common/http';

export class PokeApi extends BaseApi {
  api: HttpClient;

  constructor(api: HttpClient, config: any) {
    super(config);
    this.api = api;
  }
}
