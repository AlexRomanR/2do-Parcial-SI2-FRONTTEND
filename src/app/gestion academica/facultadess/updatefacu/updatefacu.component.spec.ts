import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefacuComponent } from './updatefacu.component';

describe('UpdatefacuComponent', () => {
  let component: UpdatefacuComponent;
  let fixture: ComponentFixture<UpdatefacuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatefacuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatefacuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
