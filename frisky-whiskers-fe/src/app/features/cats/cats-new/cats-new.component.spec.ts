import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsNewComponent } from './cats-new.component';

describe('CatsNewComponent', () => {
  let component: CatsNewComponent;
  let fixture: ComponentFixture<CatsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatsNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
