import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasViewComponent } from './rutas-view.component';

describe('RutaViewComponent', () => {
  let component: RutasViewComponent;
  let fixture: ComponentFixture<RutasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutasViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
