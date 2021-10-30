import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionalAreaComponent } from './provisional-area.component';

describe('ProvisionalAreaComponent', () => {
  let component: ProvisionalAreaComponent;
  let fixture: ComponentFixture<ProvisionalAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionalAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionalAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
