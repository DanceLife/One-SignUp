import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from '../auth/auth.service';
import { AppRoutingModule } from '../app-routing.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    AuthRoutingModule,
    CommonModule,
  ],
  exports: [
    AuthModule,
    HeaderComponent,
    AppRoutingModule,
    AuthRoutingModule
  ],
  providers: [
     AuthService,     
  ]
})
export class CoreModule {}
