import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellUsedBooksComponent } from './sell-used-books.component';

describe('SellUsedBooksComponent', () => {
	let component: SellUsedBooksComponent;
	let fixture: ComponentFixture<SellUsedBooksComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SellUsedBooksComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SellUsedBooksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
