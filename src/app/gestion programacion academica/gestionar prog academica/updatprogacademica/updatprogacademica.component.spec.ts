import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatprogacademicaComponent } from './updatprogacademica.component';

describe('UpdatprogacademicaComponent', () => {
  let component: UpdatprogacademicaComponent;
  let fixture: ComponentFixture<UpdatprogacademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatprogacademicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatprogacademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
