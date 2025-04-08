import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'app/header/header.component';
import { ApiService } from 'services/api.service';
import { FooterComponent } from 'app/footer/footer.component';

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
		FooterComponent,
	],
	providers: [
		ApiService,
	],
})
export class AppComponent {}
