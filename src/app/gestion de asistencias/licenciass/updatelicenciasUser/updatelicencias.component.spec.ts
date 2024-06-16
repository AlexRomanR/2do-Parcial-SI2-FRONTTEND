import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelicenciasComponent } from './updatelicencias.component';

describe('UpdatelicenciasComponent', () => {
  let component: UpdatelicenciasComponent;
  let fixture: ComponentFixture<UpdatelicenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatelicenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatelicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
