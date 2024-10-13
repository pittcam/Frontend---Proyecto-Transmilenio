import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionBusComponent } from './asignacion-bus.component';

describe('AsignacionBusComponent', () => {
  let component: AsignacionBusComponent;
  let fixture: ComponentFixture<AsignacionBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
