/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 15: 11: 23
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 16: 52: 02
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector   : 'app-input-search-bar',
  templateUrl: './input-search-bar.component.html',
  styleUrls  : ['./input-search-bar.component.css']
})
export class InputSearchBarComponent implements OnInit {
  // @Input @Output vs Shared singleton reactive service. References issue #18
  @Output() searchTopic: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {
    console.log('​InputSearchBarComponent:: ngOnInit()');
  }

  /**
   * Functionality for respond to input events for searching.
   *
   * @param {KeyboardEvent} event typecast info for input and event properties.
   * @memberof InputSearchBarComponent
   */
  onSearchInput(inputKeyEvent: KeyboardEvent) {
    console.log('​InputSearchBarComponent:: onSearchInput() -> inputKeyEvent', inputKeyEvent);
    const searchInputElementTarget: HTMLInputElement = <HTMLInputElement>inputKeyEvent.target;  // preserving type information
    // Get the user's search input
    const searchInputTopic: string = searchInputElementTarget.value;
    
    console.log('​InputSearchBarComponent:: onSearchInput() -> searchInput', searchInputTopic);

    this.searchTopic.emit(searchInputTopic);
    return searchInputTopic; // Not necessary
  }
}
