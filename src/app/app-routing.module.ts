import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'menu',
    loadChildren: () => import('./menuPage/menu-page.module').then(m => m.MenuPageModule)
  },
  {
    path: 'ator',
    loadChildren: () => import('./atorPage/ator-page.module').then(m => m.AtorPageModule)
  },
  {
    path: 'classe',
    loadChildren: () => import('./classePage/classe-page.module').then(m => m.ClassePageModule)
  },
  {
    path: 'diretor',
    loadChildren: () => import('./diretorPage/diretor-page.module').then(m => m.DiretorPageModule)
  },
  {
    path: 'titulo',
    loadChildren: () => import('./tituloPage/titulo-page.module').then(m => m.TituloPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./itemPage/item-page.module').then(m => m.ItemPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./clienteMenuPage/cliente-page.module').then(m => m.ClientePageModule)
  },
  {
    path: 'dependente',
    loadChildren: () => import('./dependentePage/dependente-page.module').then(m => m.DependentePageModule)
  },
  {
    path: 'socio',
    loadChildren: () => import('./socioPage/socio-page.module').then(m => m.SocioPageModule)
  },
  {
    path: 'locacao',
    loadChildren: () => import('./locacaoPage/locacao-page.module').then(m => m.LocacaoPageModule)
  },
  {
    path: 'cliente/listar',
    loadChildren: () => import('./clienteListPage/clienteList-page.module').then(m => m.ClientePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
