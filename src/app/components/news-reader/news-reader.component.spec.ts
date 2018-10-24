import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsReaderComponent } from './news-reader.component';

describe('NewsReaderComponent', () => {
  let component: NewsReaderComponent;
  let fixture: ComponentFixture<NewsReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
