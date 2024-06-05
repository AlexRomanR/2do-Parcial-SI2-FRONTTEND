import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterModuComponent } from './register-modu.component';

describe('RegisterModuComponent', () => {
  let component: RegisterModuComponent;
  let fixture: ComponentFixture<RegisterModuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterModuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterModuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
