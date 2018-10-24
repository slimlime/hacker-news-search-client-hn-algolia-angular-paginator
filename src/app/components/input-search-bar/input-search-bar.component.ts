/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 15: 11: 23
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 08: 16: 32
 */
import { Component, OnInit } from '@angular/core';

import { NewsSearchService } from './../../services/news-search.service';

@Component({
  selector   : 'app-input-search-bar',
  templateUrl: './input-search-bar.component.html',
  styleUrls  : ['./input-search-bar.component.css']
})
export class InputSearchBarComponent implements OnInit {

  // @Input @Output vs Shared singleton reactive service. References issue #18
  constructor( public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {
    console.log('​InputSearchBarComponent:: ngOnInit()');
  }

  /**
   * 
   *
   * @param {KeyboardEvent} event typecast info for input and event properties.
   * @memberof InputSearchBarComponent
   */
  onSearchInput(inputKeyEvent: KeyboardEvent) {
    console.log('​InputSearchBarComponent:: onSearchInput() -> inputKeyEvent', inputKeyEvent);
    const searchInputElementTarget: HTMLInputElement = <HTMLInputElement>inputKeyEvent.target;  // preserving type information
    const searchInputTopic: string                   = searchInputElementTarget.value;
    
    console.log('​InputSearchBarComponent:: onSearchInput() -> searchInput', searchInputTopic);

  }
}
