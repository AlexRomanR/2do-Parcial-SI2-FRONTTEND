import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RegistercarrerasComponent } from './registercarreras.component';

describe('RegistercarrerasComponent', () => {
  let component: RegistercarrerasComponent;
  let fixture: ComponentFixture<RegistercarrerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistercarrerasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistercarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
