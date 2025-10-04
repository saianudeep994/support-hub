import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewButtonRenderer } from './view-button-renderer';

describe('ViewButtonRenderer', () => {
  let component: ViewButtonRenderer;
  let fixture: ComponentFixture<ViewButtonRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewButtonRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewButtonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
