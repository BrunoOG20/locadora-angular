import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from "../shared/app-material/app-material.module";
import {SharedModule} from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LocacaoComponent } from './containers/locacaoComponent/locacao-component.component';
import { LocacaoRoutingModule } from './locacao-page-routing.module';
import { LocacaoListComponent } from './components/locacaoList/locacao-list.component';
import { LocacaoFormComponent } from './containers/locacaoForm/locacao-form.component';

@NgModule({
  declarations: [
    LocacaoComponent,
    LocacaoFormComponent,
    LocacaoListComponent
  ],
  imports: [
    CommonModule,
    LocacaoRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LocacaoPageModule { }
