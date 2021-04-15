import { Injectable } from '@angular/core';
import { ListOpts } from '../models/list-opts';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  list(options: ListOpts) {
    return Pokemon.list(options);
  }

  getFromUrl(url: string) {
    return Pokemon.getFromUrl(url);
  }

  get(name: string) {
    return Pokemon.get(name);
  }
}
