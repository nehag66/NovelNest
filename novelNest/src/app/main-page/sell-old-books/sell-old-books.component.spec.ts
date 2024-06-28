import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOldBooksComponent } from './sell-old-books.component';

describe('SellOldBooksComponent', () => {
  let component: SellOldBooksComponent;
  let fixture: ComponentFixture<SellOldBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellOldBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellOldBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
