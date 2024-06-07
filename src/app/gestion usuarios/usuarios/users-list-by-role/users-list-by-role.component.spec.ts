import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListByRoleComponent } from './users-list-by-role.component';

describe('UsersListByRoleComponent', () => {
  let component: UsersListByRoleComponent;
  let fixture: ComponentFixture<UsersListByRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListByRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersListByRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});