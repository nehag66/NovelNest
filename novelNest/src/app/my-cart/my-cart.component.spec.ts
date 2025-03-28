import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartComponent } from './my-cart.component';

describe('MyCartComponent', () => {
	let component: MyCartComponent;
	let fixture: ComponentFixture<MyCartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MyCartComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MyCartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
