import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app     = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have app title 'hacker-news-search-client-hn-algolia-angular-paginator'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app     = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('hacker-news-search-client-hn-algolia-angular-paginator');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to hacker-news-search-client-hn-algolia-angular-paginator!');
  }));
});
