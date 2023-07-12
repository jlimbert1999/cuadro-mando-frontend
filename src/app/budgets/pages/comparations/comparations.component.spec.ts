import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparationsComponent } from './comparations.component';

describe('ComparationsComponent', () => {
  let component: ComparationsComponent;
  let fixture: ComponentFixture<ComparationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparationsComponent]
    });
    fixture = TestBed.createComponent(ComparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
