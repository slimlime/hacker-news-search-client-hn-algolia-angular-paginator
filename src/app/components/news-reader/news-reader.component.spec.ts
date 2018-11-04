import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsReaderComponent } from './news-reader.component';

import { RouterTestingModule } from "@angular/router/testing";

describe('NewsReaderComponent', () => {
  let component: NewsReaderComponent;
  let fixture  : ComponentFixture<NewsReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ NewsReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(NewsReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
