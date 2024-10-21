import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';

@Component({
	selector: 'my-cart',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './my-cart.component.html',
	styleUrl: './my-cart.component.scss',
})
export class MyCartComponent {}
