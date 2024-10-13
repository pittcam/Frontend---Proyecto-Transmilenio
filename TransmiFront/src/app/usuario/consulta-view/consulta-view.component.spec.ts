import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaViewComponent } from './consulta-view.component';

describe('ConsultaViewComponent', () => {
  let component: ConsultaViewComponent;
  let fixture: ComponentFixture<ConsultaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
