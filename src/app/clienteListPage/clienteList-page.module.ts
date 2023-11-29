import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ClienteListRoutingModule } from './clienteList-page-routing.module';
import { ClienteComponent } from './containers/clienteComponent/clienteList-component.component';
import { ClienteListComponent } from './components/clienteList/clienteList-list.component';

@NgModule({
  declarations: [
    ClienteComponent,
    ClienteListComponent
  ],
  imports: [
    CommonModule,
    ClienteListRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientePageModule { }
