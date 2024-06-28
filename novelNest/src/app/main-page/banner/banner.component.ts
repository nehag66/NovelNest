import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
	selector: 'app-banner',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './banner.component.html',
	styleUrl: './banner.component.scss',
})
export class BannerComponent {}
