import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { AuthenticationPageComponent } from './components/authentication-page/authentication-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationTableComponent } from './components/authentication-table/authentication-table.component';

@NgModule({
  declarations: [AuthenticationFormComponent, AuthenticationPageComponent, AuthenticationTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AuthenticationModule { }
