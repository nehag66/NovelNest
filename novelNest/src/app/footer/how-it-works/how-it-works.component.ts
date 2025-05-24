import { Component } from '@angular/core';
import { CLIENT_ROUTES } from 'app/app.routes';

@Component({
	selector: 'app-how-it-works',
	standalone: true,
	imports: [],
	templateUrl: './how-it-works.component.html',
	styleUrl: './how-it-works.component.scss',
})
export class HowItWorksComponent {
	CLIENT_ROUTES = CLIENT_ROUTES;
}
