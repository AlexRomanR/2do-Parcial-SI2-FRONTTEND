import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgacademicaComponent } from './progacademica.component';

describe('ProgacademicaComponent', () => {
  let component: ProgacademicaComponent;
  let fixture: ComponentFixture<ProgacademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgacademicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgacademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
