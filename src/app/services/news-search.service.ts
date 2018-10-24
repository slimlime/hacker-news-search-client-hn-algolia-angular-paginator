/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 19: 01: 06
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 19: 15: 25
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsSearchService {

  constructor( public httpClient: HttpClient) {

    this.testHNAlgoliaSearch();
  }

  /**
   * Rough test of REST API
   *
   * @memberof NewsSearchService
   */
  testHNAlgoliaSearch() {
    const baseSearchUrl = "http://hn.algolia.com/api/v1/search";
    
    const searchUrlParamKey: string   = "query";
    const searchUrlParamValue: string = "Deep Learning"
    // this.httpClient.get(url, options, header, param)
    const httpSearchParams: HttpParams = new HttpParams()
      .set((searchUrlParamKey), searchUrlParamValue);
    console.log('​NewsSearchService:: testHNAlgoliaSearch() -> httpSearchParams', httpSearchParams);
    

  }
}
