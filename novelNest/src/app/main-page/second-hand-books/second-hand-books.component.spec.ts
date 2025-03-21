import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondHandBooksComponent } from './second-hand-books.component';

describe('SellUsedBooksComponent', () => {
	let component: SecondHandBooksComponent;
	let fixture: ComponentFixture<SecondHandBooksComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SecondHandBooksComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SecondHandBooksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
