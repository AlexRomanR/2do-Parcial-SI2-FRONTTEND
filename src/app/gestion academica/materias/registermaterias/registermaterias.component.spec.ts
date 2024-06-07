import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistermateriasComponent } from './registermaterias.component';

describe('RegistermateriasComponent', () => {
  let component: RegistermateriasComponent;
  let fixture: ComponentFixture<RegistermateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistermateriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistermateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
