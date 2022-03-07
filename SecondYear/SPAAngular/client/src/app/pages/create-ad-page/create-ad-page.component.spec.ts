import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdPageComponent } from './create-ad-page.component';

describe('CreateAdPageComponent', () => {
  let component: CreateAdPageComponent;
  let fixture: ComponentFixture<CreateAdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
