import { HttpClient } from "@angular/common/http";
import { ConfigService } from "../config.service";
import { PokeApi } from '../pokemon/pokemon-api';

export class ApiClient {
  private readonly api: HttpClient;
  private readonly pokeApi: PokeApi;

  constructor(client: HttpClient, configService: ConfigService) {
    this.api = client;
    this.pokeApi = new PokeApi(this.api, configService);
  }

  pokemon(): PokeApi {
    return this.pokeApi;
  }
}