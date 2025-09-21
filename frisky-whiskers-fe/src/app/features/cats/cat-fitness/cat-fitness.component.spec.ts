import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFitnessComponent } from './cat-fitness.component';

describe('CatFitnessComponent', () => {
  let component: CatFitnessComponent;
  let fixture: ComponentFixture<CatFitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatFitnessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatFitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
