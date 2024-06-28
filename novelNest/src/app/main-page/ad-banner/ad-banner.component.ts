import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
	selector: 'app-ad-banner',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './ad-banner.component.html',
	styleUrl: './ad-banner.component.scss',
})
export class AdBannerComponent {}
