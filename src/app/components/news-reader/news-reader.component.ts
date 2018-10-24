/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-25 05: 23: 34
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 09: 01: 05
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

  constructor( public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {
    const searchObs: Observable<SearchHits> = this.newsSearchService.searchHNArticles("Deep Learning");
    searchObs.subscribe((searchResultsAgg: SearchHits) => {
      console.log('​NewsReaderComponent:: ngOnInit() -> searchResultsAgg', searchResultsAgg);
      
    })
  }

}
