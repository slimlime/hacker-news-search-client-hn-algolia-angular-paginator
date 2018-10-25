/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-25 05: 23: 34
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 14: 19: 17
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

  searchInputSubject: Subject<string> = new Subject<string>();

  constructor( public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {
    const searchObs: Observable<SearchHits> = this.newsSearchService.searchHNArticles("Deep Learning");
    searchObs.subscribe((searchResultsAgg: SearchHits) => {
      console.log('​NewsReaderComponent:: ngOnInit() -> searchResultsAgg', searchResultsAgg);
      console.log('​NewsReaderComponent:: ngOnInit() -> searchResultsAgg', JSON.stringify(searchResultsAgg), null, "\t"); // -- WARNING: 20 kilobytes of text
      // - DEBUG: TEST

    });

    this.news$ = searchObs;

    const testSearchResultsObs: Observable<SearchHits> = this.newsSearchService
      .searchRealtimeValidated(this.searchInputSubject);
      
    testSearchResultsObs.subscribe(data => 
      console.log('​NewsReaderComponent:: data', data)
    );

  }

  /**
   * Get search input text.
   * For binding the event handler outputted by child search input component.
   * 
   * 
   * @param {string} searchTopic
   * @memberof NewsReaderComponent
   */
  onUserSearchInput(searchTopic: string, newsSearchService: NewsSearchService): void {
    this.searchInputSubject.next(searchTopic); // Oops hacky.

    console.log('​NewsReaderComponent:: searchTopic', searchTopic);
    // oops newsSearch expects an observable.
    // buggy

  }
}
