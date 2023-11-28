import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependenteComponent } from './containers/dependenteComponent/dependente-component.component';
import { DependenteResolver } from './guards/dependente.resolver';
import { DependenteFormComponent } from './containers/dependenteForm/dependente-form.component';

const routes: Routes = [
  { path: '', component: DependenteComponent },
  { path: 'novo', component: DependenteFormComponent, resolve: { dependente: DependenteResolver }  },
  { path: 'editar/:id', component: DependenteFormComponent, resolve: { dependente: DependenteResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DependenteRoutingModule { }
