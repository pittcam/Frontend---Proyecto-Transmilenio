import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorEditComponent } from './conductor-edit.component';

describe('ConductorEditComponent', () => {
  let component: ConductorEditComponent;
  let fixture: ComponentFixture<ConductorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductorEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConductorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
