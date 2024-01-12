import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToButtonComponent } from './go-to-button.component';

describe('GoToButtonComponent', () => {
  let component: GoToButtonComponent;
  let fixture: ComponentFixture<GoToButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoToButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoToButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
