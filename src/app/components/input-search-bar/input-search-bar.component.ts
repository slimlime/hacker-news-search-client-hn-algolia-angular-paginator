/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 15: 11: 23
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 15: 11: 23
 */
import { Component, OnInit } from '@angular/core';

import { NewsSearchService } from './../../services/news-search.service';

@Component({
  selector   : 'app-input-search-bar',
  templateUrl: './input-search-bar.component.html',
  styleUrls  : ['./input-search-bar.component.css']
})
export class InputSearchBarComponent implements OnInit {

  constructor( public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {
  }

}
