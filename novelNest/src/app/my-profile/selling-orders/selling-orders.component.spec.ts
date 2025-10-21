import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingOrdersComponent } from './selling-orders.component';

describe('SellingOrdersComponent', () => {
	let component: SellingOrdersComponent;
	let fixture: ComponentFixture<SellingOrdersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SellingOrdersComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SellingOrdersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
