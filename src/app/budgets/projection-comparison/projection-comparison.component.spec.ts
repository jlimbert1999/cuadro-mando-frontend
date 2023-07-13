import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionComparisonComponent } from './projection-comparison.component';

describe('ProjectionComparisonComponent', () => {
  let component: ProjectionComparisonComponent;
  let fixture: ComponentFixture<ProjectionComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectionComparisonComponent]
    });
    fixture = TestBed.createComponent(ProjectionComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
