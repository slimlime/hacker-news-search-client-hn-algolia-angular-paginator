import { NewsSearchService } from './../../services/news-search.service';
/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 09: 20: 02
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 09: 20: 02
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls  : ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor( public newsSearchService: NewsSearchService) { }

  ngOnInit() {

  }

}
