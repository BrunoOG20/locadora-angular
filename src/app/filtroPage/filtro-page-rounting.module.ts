import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltroComponent } from './containers/filtroComponent/filtro-component.component';

const routes: Routes = [
  {path: '', component: FiltroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltroPageRoutingModule { }
