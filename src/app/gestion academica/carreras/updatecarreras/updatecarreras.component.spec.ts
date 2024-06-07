import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecarrerasComponent } from './updatecarreras.component';

describe('UpdatecarrerasComponent', () => {
  let component: UpdatecarrerasComponent;
  let fixture: ComponentFixture<UpdatecarrerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecarrerasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatecarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
