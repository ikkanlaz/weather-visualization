import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationContentComponent } from './visualization-content.component';

describe('VisualizationContentComponent', () => {
  let component: VisualizationContentComponent;
  let fixture: ComponentFixture<VisualizationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
