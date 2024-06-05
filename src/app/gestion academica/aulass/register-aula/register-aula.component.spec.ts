import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAulaComponent } from './register-aula.component';

describe('RegisterAulaComponent', () => {
  let component: RegisterAulaComponent;
  let fixture: ComponentFixture<RegisterAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
