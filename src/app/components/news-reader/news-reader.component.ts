/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-25 05: 23: 34
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 13: 31: 38
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchHits } from './../../models/search-results-hits';
import { NewsSearchService } from './../../services/news-search.service';


@Component({
  selector   : 'app-news-reader',
  templateUrl: './news-reader.component.html',
  styleUrls  : ['./news-reader.component.css']
})
export class NewsReaderComponent implements OnInit {
  news$: Observable<SearchHits>;

  constructor( public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {
    const searchObs: Observable<SearchHits> = this.newsSearchService.searchHNArticles("Deep Learning");
    searchObs.subscribe((searchResultsAgg: SearchHits) => {
      console.log('​NewsReaderComponent:: ngOnInit() -> searchResultsAgg', searchResultsAgg);
      // - DEBUG: TEST
    });

    this.news$ = searchObs;

  }

  /**
   * Get search input text.
   * For binding the event handler outputted by child search input component.
   * 
   * 
   * @param {string} searchTopic
   * @memberof NewsReaderComponent
   */
  onUserSearchInput(searchTopic: string): void {
    console.log('​NewsReaderComponent:: searchTopic', searchTopic);
    
  }
}
