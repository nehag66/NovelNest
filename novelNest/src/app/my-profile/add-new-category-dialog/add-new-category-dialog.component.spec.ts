import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCategoryDialogComponent } from './add-new-category-dialog.component';

describe('AddNewCategoryDialogComponent', () => {
	let component: AddNewCategoryDialogComponent;
	let fixture: ComponentFixture<AddNewCategoryDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddNewCategoryDialogComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AddNewCategoryDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
