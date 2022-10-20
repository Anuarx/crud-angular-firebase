import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationTableComponent } from './authentication-table.component';

describe('AuthenticationTableComponent', () => {
  let component: AuthenticationTableComponent;
  let fixture: ComponentFixture<AuthenticationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
