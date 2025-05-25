import { Component } from '@angular/core';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
})
export class FooterComponent {
	CLIENT_ROUTES = CLIENT_ROUTES;
}
