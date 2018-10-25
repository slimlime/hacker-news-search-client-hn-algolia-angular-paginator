/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-25 05: 23: 34
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 16: 36: 48
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

import { SearchHits } from './../../models/search-results-hits';
import { NewsSearchService } from './../../services/news-search.service';



@Component({
  selector   : 'app-news-reader',
  templateUrl: './news-reader.component.html',
  styleUrls  : ['./news-reader.component.css']
})
export class NewsReaderComponent implements OnInit {
  news$: Observable<SearchHits>;

  searchInputSubject$: Subject<string> = new Subject<string>();

  constructor( 
    public activatedRoute   : ActivatedRoute,
    public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params: Params) => {
        console.log('​NewsReaderComponent:: ngOnInit() -> params', params);
      }
    )
    // Set up news feed reactive data source
    this.news$ = this.setupNewsSubscriptionSource(this.newsSearchService);
  }


  /**
   * 
   *
   * @param {Observable<SearchHits>} news$
   * @param {NewsSearchService} newsSearchService
   * @memberof NewsReaderComponent
   */
  setupNewsSubscriptionSource(
    newsSearchService: NewsSearchService
    )                : Observable<SearchHits> {

    // Setup/subscribe to reactive news search results.
    // Prepare reactivity into news search service for user input as they occur.
    const searchObs: Observable<SearchHits> = this.newsSearchService
      .searchRealtimeValidated(this.searchInputSubject$)
    ;

    // Return the reactive data source
    return searchObs;
  }

  /**
   * Get search input text. Push the input updates into the searchInputSubject
   * For binding the event handler outputted by child search input component.
   * 
   * @example this.onUserSearchInput("Deep Learning", this.searchInputSubject);
   * @param {string} searchTopic
   * @param {Subject<string>} searchInputSubject$
   * @memberof NewsReaderComponent
   */
  onUserSearchInput(searchTopic: string, searchInputSubject$: Subject<string>): void {
    console.log('​NewsReaderComponent:: onUserSearchInput -> searchTopic', searchTopic);

    searchInputSubject$.next(searchTopic); // Feels hacky/suboptimal

  }
}
