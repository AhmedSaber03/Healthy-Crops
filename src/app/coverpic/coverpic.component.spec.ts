import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverpicComponent } from './coverpic.component';

describe('CoverpicComponent', () => {
  let component: CoverpicComponent;
  let fixture: ComponentFixture<CoverpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverpicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
