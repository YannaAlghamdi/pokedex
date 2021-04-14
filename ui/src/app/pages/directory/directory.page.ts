import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DefaultUrlSerializer } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfigService } from 'src/app/config.service';
import { ListOpts } from 'src/app/models/list-opts';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DirectoryPage implements OnInit {

  listOptions: ListOpts;
  rows = new Array<any>();
  nextUrl: string;
  previousUrl: string;
  constructor(private pokemonService: PokemonService, private configService: ConfigService) {

  }

  ngOnInit() {
    this.listOptions = new ListOpts()
      .withLimit(20)
      .withOffset(0);
    this.getList(this.listOptions);
  }

  getList(options: ListOpts) {
    this.pokemonService.list(options).then(data => {
      this.previousUrl = data.previous;
      this.nextUrl = data.next;
      this.rows = this.setAvatar(data.results, options.getOffset());
    });
  }

  setAvatar(data: Array<any>, offset: number) {
    return data.map((poke, index) => {
      poke.avatar = this.getPokeImage(offset + index + 1);
      poke.index = offset + index + 1;
      return poke;
    })
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    if (val) {
      this.pokemonService.get(val).then(data => {
        console.log(data)
        this.rows = this.setAvatar([data], data.id - 1);
      })
    }
    else {
      this.listOptions = new ListOpts()
        .withLimit(20)
        .withOffset(0);
      this.getList(this.listOptions);
    }
  }

  getPokeImage(index) {
    return `${this.configService.get('imageUrl')}${index}.png`;
  }

  next() {
    this.listOptions.withOffset(this.listOptions.getOffset() + 20);
    this.pokemonService.listFromUrl(this.nextUrl).then(data => {
      this.previousUrl = data.previous;
      this.nextUrl = data.next;
      this.rows = this.setAvatar(data.results, this.listOptions.getOffset());
    });
  }

  back() {
    this.listOptions.withOffset(this.listOptions.getOffset() - 20);
    this.pokemonService.listFromUrl(this.previousUrl).then(data => {
      this.previousUrl = data.previous;
      this.nextUrl = data.next;
      this.rows = this.setAvatar(data.results, this.listOptions.getOffset());
    });
  }

}
