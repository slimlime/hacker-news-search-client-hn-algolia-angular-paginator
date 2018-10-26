/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 09: 20: 24
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 08: 35: 36
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SearchResultTopical } from '../../models/search-result-topic';

@Component({
  selector   : 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls  : ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {
  @Input () searchResultItem: SearchResultTopical;                            // can intercept input get pty
  @Output() clickChange     : EventEmitter<MouseEvent> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
    
  }

  onClick(event: MouseEvent) {

    this.clickChange.emit(event);
    return event;
  }
}
