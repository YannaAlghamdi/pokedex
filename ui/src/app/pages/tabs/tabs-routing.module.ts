import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'pokedex',
    component: TabsPage,
    children: [
      {
        path: 'directory',
        loadChildren: () => import('../directory/directory.module').then(m => m.DirectoryPageModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('../inventory/inventory.module').then(m => m.InventoryPageModule)
      },
      {
        path: 'wishlist',
        loadChildren: () => import('../wishlist/wishlist.module').then(m => m.WishlistPageModule)
      },
      {
        path: 'details/:name',
        loadChildren: () => import('../pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailPageModule)
      },
      {
        path: '',
        redirectTo: '/pokedex/directory',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pokedex/directory',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
