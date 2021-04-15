import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config.service';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {


  rows = new Array<Pokemon>();
  nextUrl: string;
  previousUrl: string;
  constructor(private pokemonService: PokemonService, private configService: ConfigService, private router: Router) {

  }

  ngOnInit() {
    Object.assign(this.rows, JSON.parse(localStorage.getItem("wishlist")));
  }

  ionViewWillEnter() {
    Object.assign(this.rows, JSON.parse(localStorage.getItem("wishlist")));
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const rows = Object.assign(this.rows, JSON.parse(localStorage.getItem("wishlist")));
    if (val) {
      this.rows = rows.filter(data => data.name == val)
    }
    else {
      this.rows = rows;
    }
  }

  getPokeImage(index) {
    return `${this.configService.get('imageUrl')}${index}.png`;
  }

  setTypeColor(name, pokemon) {
    this.pokemonService.get(name).then(data => {
      pokemon.type = data.types[0].type.name;
      console.log(pokemon.type)
    })
  }

  goToDetails(name) {
    this.router.navigate([`pokedex/details/${name}`]);
  }

  back() {
    this.router.navigate(['pokedex/directory'])
  }

}
