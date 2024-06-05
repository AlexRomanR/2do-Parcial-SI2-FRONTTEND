import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemoduComponent } from './updatemodu.component';

describe('UpdatemoduComponent', () => {
  let component: UpdatemoduComponent;
  let fixture: ComponentFixture<UpdatemoduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatemoduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatemoduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
