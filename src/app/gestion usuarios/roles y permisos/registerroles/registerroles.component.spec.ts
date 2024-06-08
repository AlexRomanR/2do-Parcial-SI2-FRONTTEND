import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterrolesComponent } from './registerroles.component';

describe('RegisterrolesComponent', () => {
  let component: RegisterrolesComponent;
  let fixture: ComponentFixture<RegisterrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterrolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
