import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  name: string;
  inventory: Array<Pokemon>;
  wishlist: Array<Pokemon>;
  pokeDetails: any;
  slideOpts = {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    }
  };

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');;
    this.pokemonService.get(this.name).then(data => {
      let sprites = Object.keys(data['sprites']);
      sprites.splice(sprites.indexOf('versions'), 1);
      sprites.splice(sprites.indexOf('other'), 1);
      data['images'] = sprites
        .map(spriteKey => data['sprites'][spriteKey])
        .filter(img => img);
      this.pokeDetails = data;
    })
    this.wishlist = new Array<Pokemon>();
    this.inventory = new Array<Pokemon>();
  }

  async addToWishlist(name: string, order: number, url: string, type: string) {
    if (JSON.parse(localStorage.getItem("wishlist")))
      this.wishlist = JSON.parse(localStorage.getItem("wishlist"));

    if (!this.wishlist.length || (this.wishlist.length > 0 && !this.wishlist.find(x => x.name == name)))
      this.wishlist.push(new Pokemon()
        .withName(name)
        .withIndex(order)
        .withUrl(url)
        .withType(type))
    const toast = await this.toastController.create({
      message: `${name.charAt(0).toUpperCase() + name.slice(1)} is added to your wishlist!`,
      duration: 2000,
      color: 'light'
    });
    localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    toast.present();
  }


  async addToInventory(name: string, order: number, url: string, type: string) {
    if (JSON.parse(localStorage.getItem("inventory")))
      this.inventory = JSON.parse(localStorage.getItem("inventory"));

    if (!this.inventory.length || (this.inventory.length > 0 && !this.inventory.find(x => x.name == name)))
      this.inventory.push(new Pokemon()
        .withName(name)
        .withIndex(order)
        .withUrl(url)
        .withType(type))

    const toast = await this.toastController.create({
      message: `${name.charAt(0).toUpperCase() + name.slice(1)} is caught!`,
      duration: 2000,
      cssClass: 'toast'
    });
    localStorage.setItem("inventory", JSON.stringify(this.inventory));
    toast.present();
  }

  back() {
    this.router.navigate(['pokedex/directory'])
  }
}
