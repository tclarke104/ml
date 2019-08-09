import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainContainerComponent } from './train-container.component';

describe('TrainContainerComponent', () => {
  let component: TrainContainerComponent;
  let fixture: ComponentFixture<TrainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
