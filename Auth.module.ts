import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SigninComponent } from './src/app/signin/signin.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,   // Import CommonModule for basic Angular directives
    FormsModule,
    SigninComponent   // Import the standalone component here
  ],
  exports: [
    SigninComponent // Export it if you want to use it in other modules
  ]
})
export class AuthModule { }
