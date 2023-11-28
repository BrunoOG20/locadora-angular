import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from "../shared/app-material/app-material.module";
import {SharedModule} from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SocioComponent } from './containers/socioComponent/socio-component.component';
import { SocioFormComponent } from './containers/socioForm/socio-form.component';
import { SocioListComponent } from './components/socioList/socio-list.component';
import { SocioRoutingModule } from './socio-page-routing.module';

@NgModule({
  declarations: [
    SocioComponent,
    SocioFormComponent,
    SocioListComponent
  ],
  imports: [
    CommonModule,
    SocioRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SocioPageModule { }
