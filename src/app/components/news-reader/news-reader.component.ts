/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-25 05: 23: 34
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 05: 24: 01
 */
import { Component, OnInit } from '@angular/core';

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
  }

}
