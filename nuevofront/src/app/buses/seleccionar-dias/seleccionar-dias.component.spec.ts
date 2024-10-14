import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarDiasComponent } from './seleccionar-dias.component';

describe('SeleccionarDiasComponent', () => {
  let component: SeleccionarDiasComponent;
  let fixture: ComponentFixture<SeleccionarDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarDiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
