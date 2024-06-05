import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateaulaComponent } from './updateaula.component';

describe('UpdateaulaComponent', () => {
  let component: UpdateaulaComponent;
  let fixture: ComponentFixture<UpdateaulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateaulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateaulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
