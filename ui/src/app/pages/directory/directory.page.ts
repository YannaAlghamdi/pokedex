import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DefaultUrlSerializer } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfigService } from 'src/app/config.service';
import { Page } from 'src/app/models/page';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DirectoryPage implements OnInit {

  page = new Page();
  rows = new Array<any>();
  offset: number;

  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private pokemonService: PokemonService, private configService: ConfigService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.pokemonService.list(pageInfo.offset).then(data => {
      this.page.totalElements = data.count;
      this.rows = this.setThumbnails(data.results, pageInfo.offset);
    });
  }

  setThumbnails(data: Array<any>, offset: number) {
    return data.map((poke, index) => {
      poke.avatar = this.getPokeImage(offset + index + 1);
      poke.index = offset + index + 1;
      return poke;
    })
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if (val) {
      const temp = this.rows.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.rows = temp;
      this.table.offset = 0;
    }
    else {
      this.setPage({ offset: 0 });
    }
  }

  getPokeImage(index) {
    return `${this.configService.get('imageUrl')}${index}.png`;
  }

  getRowClass() {
    return {
      'row': true
    }
  }
}
