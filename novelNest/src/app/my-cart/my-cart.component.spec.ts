import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartComponent } from './my-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';

describe('MyCartComponent', () => {
	let component: MyCartComponent;
	let fixture: ComponentFixture<MyCartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				MyCartComponent,
			],
			providers: [CartService, ApiService],
		}).compileComponents();

		fixture = TestBed.createComponent(MyCartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
