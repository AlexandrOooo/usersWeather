import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedUsersComponent } from './saved-users.component';

describe('SavedUsersComponent', () => {
  let component: SavedUsersComponent;
  let fixture: ComponentFixture<SavedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
