import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchBarComponent } from './input-search-bar.component';

describe('InputSearchBarComponent', () => {
  let component: InputSearchBarComponent;
  let fixture: ComponentFixture<InputSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
