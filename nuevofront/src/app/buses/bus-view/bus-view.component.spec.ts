import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusViewComponent } from './bus-view.component';

describe('BusViewComponent', () => {
  let component: BusViewComponent;
  let fixture: ComponentFixture<BusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
