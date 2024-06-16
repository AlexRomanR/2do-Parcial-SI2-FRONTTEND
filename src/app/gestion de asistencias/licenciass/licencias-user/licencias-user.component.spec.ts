import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciasUserComponent } from './licencias-user.component';

describe('LicenciasUserComponent', () => {
  let component: LicenciasUserComponent;
  let fixture: ComponentFixture<LicenciasUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenciasUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenciasUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
