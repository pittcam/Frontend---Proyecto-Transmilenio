import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionRutaComponent } from './asignacion-ruta.component';

describe('AsignacionRutaComponent', () => {
  let component: AsignacionRutaComponent;
  let fixture: ComponentFixture<AsignacionRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionRutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
