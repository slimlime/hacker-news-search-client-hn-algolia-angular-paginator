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
 * -- TODO: Refactor
 * @enum 
 */
export enum ButtonConfig {
  Previous = "Previous",
  Next     = "Next"
}

/**
 * Recommended increments.
 * -- TODO: Break out interfaces
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
 * Could also add page step information here for all page tracking components.
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
   * Output to emit pagetracking information, nav page number on interaction
   * Used to navigate to a specific pagenumber.
   * 
   * Could be refactored to improve facility for general nav components
   *
   * @type {EventEmitter<PageTrack>}
   * @memberof ButtonComponent
   */
  @Output() buttonClickNavigateToPageNumber: EventEmitter<PageTrack>;

  constructor(public router: Router) {

  }

  ngOnInit() {
    console.log('​ButtonComponent:: ngOnInit() -> pageTrack', JSON.stringify(this.pageTrack));
  }

  /**
   * Emit page tracking navigation information on interaction.
   * 
   * 
   * ??REST API limits might be 0,1 .. 50 51~ pages
   * @param {Router} router
   * @param {PageTrack} pageTrack
   * @memberof ButtonComponent
   */
  onPageNavButtonEmit(router: Router, pageTrack: PageTrack): void {
    // Hacky +prepend TypeScript number type not consistent in JavaScript. Concatenate digits bug.
    const buttonNavType = pageTrack.navType;  // e.g. back/forwards button

    // pageStep in-built increment logic in button component to refactor. Redesign
    const pageStep: number = +this.getPageStep(buttonNavType);  // -- TODO: Refactor nav config
    
    // New paginator pageNum to redirect to.
    const pageNavNum: number = this.pageNumWrapAroundCheck(pageStep, pageTrack);

    
    const newNavPageTrack: PageTrack = {
      currentPageNum: pageTrack.currentPageNum,
      totalNumPages : pageTrack.totalNumPages,
      navType       : pageTrack.navType,
      newPageNavNum : pageNavNum,
    } 

    // Fin emit configured nav information back to top-level smart component.
    this.buttonClickNavigateToPageNumber.emit(newNavPageTrack);
  }

  /**
   * Page step logic
   * -- TODO: Refactor, pageNavStep should probably be included as an input with
   * {PageTrack} for customisability.
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
   * @param {number} pageStep positive or negative increments. (Generally +-1)
   * @param {PageTrack} pageTrack pagination nav feed information
   * @returns {number}
   * @memberof ButtonComponent
   */
  pageNumWrapAroundCheck(pageStep: number, pageTrack: PageTrack): number {
    const pageNum: number = +(pageTrack.currentPageNum)
    // Careful. TypeScript number type doesn't assert in JavaScript...
    const newPageNumber: number = ((pageNum + pageStep) >= 0) ? (pageNum + pageStep) : 0;
    console.log('​ButtonComponent:: newPageNumber', newPageNumber);

    return newPageNumber;
  }
}
