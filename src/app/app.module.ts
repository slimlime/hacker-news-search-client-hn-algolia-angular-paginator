import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchResultItemComponent } from './components/search-result-item/search-result-item.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AppRoutingModule } from './/app-routing.module';
import { InputSearchBarComponent } from './components/input-search-bar/input-search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchResultItemComponent,
    SearchResultsComponent,
    InputSearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
