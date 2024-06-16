import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsistenciasComponent } from './register-asistencias.component';

describe('RegisterAsistenciasComponent', () => {
  let component: RegisterAsistenciasComponent;
  let fixture: ComponentFixture<RegisterAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAsistenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
