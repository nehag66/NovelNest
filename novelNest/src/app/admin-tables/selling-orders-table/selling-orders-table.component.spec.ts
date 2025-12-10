import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingOrdersTableComponent } from './selling-orders-table.component';

describe('SellingOrdersTableComponent', () => {
  let component: SellingOrdersTableComponent;
  let fixture: ComponentFixture<SellingOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingOrdersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellingOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
