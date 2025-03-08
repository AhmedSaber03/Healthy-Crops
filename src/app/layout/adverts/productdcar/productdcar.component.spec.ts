import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdcarComponent } from './productdcar.component';

describe('ProductdcarComponent', () => {
  let component: ProductdcarComponent;
  let fixture: ComponentFixture<ProductdcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductdcarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductdcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
