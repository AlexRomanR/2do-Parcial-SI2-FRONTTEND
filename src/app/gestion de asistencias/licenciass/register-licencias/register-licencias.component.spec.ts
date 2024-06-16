import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLicenciasComponent } from './register-licencias.component';

describe('RegisterLicenciasComponent', () => {
  let component: RegisterLicenciasComponent;
  let fixture: ComponentFixture<RegisterLicenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLicenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
