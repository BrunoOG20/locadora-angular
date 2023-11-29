import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './containers/clienteComponent/clienteList-component.component';

const routes: Routes = [
  { path: '', component: ClienteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteListRoutingModule { }
