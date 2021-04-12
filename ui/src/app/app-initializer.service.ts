import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClient } from './api/api-client';
import { ConfigService } from './config.service';
import { Model } from './model';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.init();
  }

  init() {
    Model.setApiClient(new ApiClient(this.http, this.configService));
  }
}
