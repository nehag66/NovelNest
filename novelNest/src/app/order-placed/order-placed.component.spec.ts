import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPlacedComponent } from './order-placed.component';

describe('OrderPlacedComponent', () => {
	let component: OrderPlacedComponent;
	let fixture: ComponentFixture<OrderPlacedComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OrderPlacedComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(OrderPlacedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
