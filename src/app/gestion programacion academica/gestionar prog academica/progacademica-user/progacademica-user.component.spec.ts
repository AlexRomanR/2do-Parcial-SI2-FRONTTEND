import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgacademicaUserComponent } from './progacademica-user.component';

describe('ProgacademicaUserComponent', () => {
  let component: ProgacademicaUserComponent;
  let fixture: ComponentFixture<ProgacademicaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgacademicaUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgacademicaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
