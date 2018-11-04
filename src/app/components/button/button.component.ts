/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 15: 09: 59
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-26 08: 52: 13
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

/**
 * 
 * -- TODO Refactor
 * @enum 
 */
export enum ButtonConfig {
  Previous = "Previous",
  Next     = "Next"
}

/**
 * Recommended increments.
 *
 * @export
 * @enum {number}
 */
export enum PageNavStep {
  Previous = -1,
  Next     = 1
}

/**
 * Assist page tracking information of paginated view components.
 *
 * @export
 * @interface PageTrack
 */
export interface PageTrack {
  /**
   * Current page number 
   *
   * @type {number}
   * @memberof PageTrack
   */
  readonly currentPageNum: number,

  /**
   *
   *
   * @type {number}
   * @memberof PageTrack
   */
  readonly totalNumPages: number,

  /**
   * Type of interact component / button.
   * @example ButtonConfig.Next .Previous
   * @type {ButtonConfig}
   * @memberof PageTrack
   */
  readonly navType: ButtonConfig,

  /**
   * New page number to be emitted from button/interact component
   * 
   * @type {number} optional
   * @memberof PageTrack
   */
  readonly newPageNavNum?: number
}
@Component({
  selector   : 'app-button',
  templateUrl: './button.component.html',
  styleUrls  : ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  /**
   * Input pageTrack to set up button component.
   * Style, label, navigation type.
   *
   * @type {PageTrack}
   * @memberof ButtonComponent
   */
  @Input() pageTrack: PageTrack;
  
  /**
   * Output to emit page number on interaction
   * Could be refactored to improve facility for general nav components
   *
   * @type {EventEmitter<number>}
   * @memberof ButtonComponent
   */
  @Output() buttonClickNavigateToPageNumber: EventEmitter<number>;

  constructor(public router: Router) {

  }

  ngOnInit() {
    console.log('​ButtonComponent:: ngOnInit() -> pageTrack', JSON.stringify(this.pageTrack));
  }

  /**
   * Navigation logic for button presses.
   * 
   * ??REST API limits might be 0,1 .. 50 51~ pages
   * @param {number} pageStep positive or negative increments. (Generally +-1)
   * @param {PageTrack} pageTrack
   * @memberof ButtonComponent
   */
  onPageNavButton(router: Router, pageTrack: PageTrack): void {
    // Hacky +prepend TypeScript number type not consistent in JavaScript. Concatenate digits bug.
    const buttonNavType    = pageTrack.navType;                 // e.g. back/forwards button
    const pageStep: number = +this.getPageStep(buttonNavType);
    // console.log('​ButtonComponent:: onPageNavButton() -> pageStep', pageStep);
    const pageNavNum: number = this.pageNumWrapAroundCheck(pageStep, pageTrack);
    // console.log('​ButtonComponent:: onPageNavButton() -> pageNavNum', pageNavNum);
    
    const newPg: PageTrack = {
      currentPageNum: pageTrack.currentPageNum,
      totalNumPages : pageTrack.totalNumPages,
      navType       : pageTrack.navType,
      newPageNavNum : pageNavNum,
    } 
    router.navigate(['/news-reader', pageNavNum]) // - TODO: Clean up magic string literals
    // exports, constants, compile dev info.
  }

  /**
   * Page step logic
   *
   * @param {ButtonConfig} navType
   * @returns {number}
   * @memberof ButtonComponent
   */
  getPageStep(navType: ButtonConfig): number {
    // Playing around with enum and switch for fun.
    switch(navType) {
      case ButtonConfig.Previous: {
        return PageNavStep.Previous;
      }
      case ButtonConfig.Next: {
        return PageNavStep.Next;
      }
      default: {
        return PageNavStep.Next;
      }
    }
  }
  /**
   * Simple check for logical page number limits
   *
   * @memberof ButtonComponent
   */
  pageNumWrapAroundCheck(pageStep: number, pageTrack: PageTrack): number {
    const pageNum: number = +(pageTrack.currentPageNum)
    // console.log('​ButtonComponent:: pageNum', pageNum, pageNum+pageStep);
    // Careful. TypeScript number type doesn't assert in JavaScript...
    const newPageNumber: number = ((pageNum + pageStep) >= 0) ? (pageNum + pageStep) : 0;
    console.log('​ButtonComponent:: newPageNumber', newPageNumber);

    return newPageNumber;
  }
}
