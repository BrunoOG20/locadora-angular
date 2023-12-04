import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocacaoComponent } from './containers/locacaoComponent/locacao-component.component';
import { LocacaoFormComponent } from './containers/locacaoForm/locacao-form.component';
import { LocacaoResolver } from './guards/locacao.resolver';

const routes: Routes = [
  { path: '', component: LocacaoComponent },
  { path: 'novo', component: LocacaoFormComponent, resolve: { locacao: LocacaoResolver }  },
  { path: 'editar/:id', component: LocacaoFormComponent, resolve: { locacao: LocacaoResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocacaoRoutingModule { }
