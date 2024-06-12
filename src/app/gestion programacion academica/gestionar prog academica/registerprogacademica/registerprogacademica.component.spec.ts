import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterprogacademicaComponent } from './registerprogacademica.component';

describe('RegisterprogacademicaComponent', () => {
  let component: RegisterprogacademicaComponent;
  let fixture: ComponentFixture<RegisterprogacademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterprogacademicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterprogacademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
