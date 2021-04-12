import { Injectable, APP_INITIALIZER } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: any;

  static ConfigFactory(config: ConfigService) {
    return async () => await config.load();
  }

  constructor(private http: HttpClient) { }

  async load() {
    await this.getConfig().toPromise().then(data => this.config = data);
  }

  get(key: string) {
    return this.config[key];
  }

  private getConfig() {
    return this.http.get(`${environment.configUrl}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    });
  }

  static init() {
    return {
      provide: APP_INITIALIZER,
      useFactory: ConfigService.ConfigFactory,
      deps: [ConfigService],
      multi: true
    }
  }
}
