/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-25 05: 23: 34
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 14: 39: 48
 */
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  constructor( public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {

    // Setup/subscribe to reactive news search results.
    const searchObs: Observable<SearchHits> = this.newsSearchService
      .searchRealtimeValidated(this.searchInputSubject$)
    ;
    this.news$ = searchObs;

    searchObs.subscribe((searchResults: SearchHits) => 
      console.log('​NewsReaderComponent:: ngOnInit -> searchResults number of hits', searchResults.hits)
    );

  }

  /**
   * Get search input text. Push the input updates into the searchInputSubject
   * For binding the event handler outputted by child search input component.
   * 
   * @example this.onUserSearchInput("Deep Learning", this.searchInputSubject);
   * @param {string} searchTopic
   * @memberof NewsReaderComponent
   */
  onUserSearchInput(searchTopic: string, searchInputSubject$: Subject<string>): void {
    console.log('​NewsReaderComponent:: onUserSearchInput -> searchTopic', searchTopic);

    searchInputSubject$.next(searchTopic); // Feels hacky/suboptimal

  }
}
