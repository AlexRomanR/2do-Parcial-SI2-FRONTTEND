import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFacuComponent } from './register-facu.component';

describe('RegisterFacuComponent', () => {
  let component: RegisterFacuComponent;
  let fixture: ComponentFixture<RegisterFacuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFacuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterFacuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
