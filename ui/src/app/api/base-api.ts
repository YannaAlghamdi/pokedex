import { ConfigService } from 'src/app/config.service';

export class BaseApi {
  protected configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }
}
