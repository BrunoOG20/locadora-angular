import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DependenteComponent } from './containers/dependenteComponent/dependente-component.component';
import { DependenteRoutingModule } from './dependente-page-routing.module';
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { SharedModule } from "../shared/shared.module";
import { DependenteFormComponent } from './containers/dependenteForm/dependente-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { DependenteListComponent } from './components/dependenteList/dependente-list.component';

@NgModule({
  declarations: [
    DependenteComponent,
    DependenteFormComponent,
    DependenteListComponent
  ],
  imports: [
    CommonModule,
    DependenteRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DependentePageModule { }
