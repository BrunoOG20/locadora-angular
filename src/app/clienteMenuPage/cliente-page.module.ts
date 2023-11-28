import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { ClienteComponent } from "./components/clienteList/cliente-component.component";
import { ClienteRoutingModule } from './cliente-page-routing.module';

@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    AppMaterialModule,
  ]
})
export class ClientePageModule { }
