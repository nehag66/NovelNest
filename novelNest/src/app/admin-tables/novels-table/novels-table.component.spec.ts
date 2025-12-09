import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelsTableComponent } from './novels-table.component';

describe('NovelsTableComponent', () => {
	let component: NovelsTableComponent;
	let fixture: ComponentFixture<NovelsTableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NovelsTableComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NovelsTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
