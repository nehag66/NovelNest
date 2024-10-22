import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ApiService } from 'services/api.service';
import { MainPageComponent } from './main-page/main-page.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
    RouterOutlet,
    HeaderComponent,
    MaterialModule,
    CommonModule,
    MainPageComponent,
    HttpClientModule,
],
	providers: [ApiService],
})
export class AppComponent {}
