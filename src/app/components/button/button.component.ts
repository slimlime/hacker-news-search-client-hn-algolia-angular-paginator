/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 15: 09: 59
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 19: 59: 34
 */

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * 
 * -- TODO Refactory
 * @enum 
 */
export enum ButtonConfig {
  Back    = "back",
  Forward = "forward"
}

export enum PageNavStep {
  Back    = -1,
  Forward = 1
}
export interface PageTrack {
  readonly currentPageNum: number,
  readonly totalNumPages : number,
  readonly navType       : ButtonConfig
}
@Component({
  selector   : 'app-button',
  templateUrl: './button.component.html',
  styleUrls  : ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() pageTrack: PageTrack;


  constructor(public router: Router) {

  }

  ngOnInit() {
    console.log('​ButtonComponent:: ngOnInit() -> pageTrack', JSON.stringify(this.pageTrack));
  }

  /**
   *
   * ??REST API limits might be 0,1 .. 50 51~ pages
   * @param {number} pageStep positive or negative increments. (Generally +-1)
   * @param {PageTrack} pageTrack
   * @memberof ButtonComponent
   */
  onPageNavButton(router: Router, pageTrack: PageTrack) {
    
    const buttonNavType    = pageTrack.navType;                // e.g. back/forwards button
    const pageStep: number = this.getPageStep(buttonNavType);
    console.log('​ButtonComponent:: onPageNavButton() -> pageStep', pageStep);
    const pageNavNum: number = this.pageNumWrapAroundCheck(pageStep, pageTrack);
    console.log('​ButtonComponent:: onPageNavButton() -> pageNavNum', pageNavNum);
    
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
      case ButtonConfig.Back: {
        return PageNavStep.Back;
      }
      case ButtonConfig.Forward: {
        return PageNavStep.Forward;
      }
      default: {
        return PageNavStep.Forward;
      }
    }
  }
  /**
   * Simple check for logical page number limits
   *
   * @memberof ButtonComponent
   */
  pageNumWrapAroundCheck(pageStep: number, pageTrack: PageTrack): number {
    const pageNum = pageTrack.currentPageNum
      console.log('​ButtonComponent:: pageNum', pageNum);
      // - TODO: Check if page num 0, 1
    const newPageNumber = ((pageNum + pageStep) >= 0) ? (pageNum + pageStep) : 0;
    console.log('​ButtonComponent:: newPageNumber', newPageNumber);

    return newPageNumber;
  }
}
