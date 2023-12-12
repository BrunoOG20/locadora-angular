import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { FiltroComponent } from './containers/filtroComponent/filtro-component.component';
import { FiltroPageRoutingModule } from './filtro-page-rounting.module';

@NgModule({
  declarations: [
    FiltroComponent
  ],
  imports: [
    CommonModule,
    FiltroPageRoutingModule,
    AppMaterialModule,
  ]
})
export class FiltroPageModule { }
