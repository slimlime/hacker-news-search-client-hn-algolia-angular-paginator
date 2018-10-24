import { SearchHits } from './../../models/search-results-hits';
/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 09: 20: 02
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 09: 19: 06
 */
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector   : 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls  : ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() searchResults: SearchHits;  // List of search results to pretty present.

  constructor() { }

  ngOnInit() {

    console.log('​SearchResultsComponent:: ngOnInit() -> searchResults', this.searchResults);
  }

}
