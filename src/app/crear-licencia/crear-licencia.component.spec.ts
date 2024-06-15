import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLicenciaComponent } from './crear-licencia.component';

describe('CrearLicenciaComponent', () => {
  let component: CrearLicenciaComponent;
  let fixture: ComponentFixture<CrearLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearLicenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
