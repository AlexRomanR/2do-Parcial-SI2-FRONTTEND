import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMateriasComponent } from './updatematerias.component';

describe('UpdatemateriasComponent', () => {
  let component: UpdateMateriasComponent;
  let fixture: ComponentFixture<UpdateMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMateriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
