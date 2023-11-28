import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocioComponent } from './containers/socioComponent/socio-component.component';
import { SocioFormComponent } from './containers/socioForm/socio-form.component';
import { SocioResolver } from './guards/socio.resolver';

const routes: Routes = [
  { path: '', component: SocioComponent },
  { path: 'novo', component: SocioFormComponent, resolve: { ator: SocioResolver }  },
  { path: 'editar/:id', component: SocioFormComponent, resolve: { ator: SocioResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocioRoutingModule { }
