/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 19: 01: 06
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 19: 15: 25
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


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
    const baseSearchHNAlgoliaUrl = "http://hn.algolia.com/api/v1/search";
    
    const searchUrlParamKey: string   = "query";
    const searchUrlParamValue: string = "Deep Learning";
    // this.httpClient.get(url, options, header, param)
    const httpSearchParams: HttpParams = new HttpParams().set(
      (searchUrlParamKey), searchUrlParamValue
    );
    console.log('​NewsSearchService:: testHNAlgoliaSearch() -> httpSearchParams', httpSearchParams);

    /** 
     * Destructured http options object { headers, params, ...}
     * Options object parameter doesn't have an interface in Angular :sad: 
     */
    const newsObservable: Observable<any> = this.httpClient.get(baseSearchHNAlgoliaUrl, {params: httpSearchParams});
    console.log('​NewsSearchService:: testHNAlgoliaSearch() -> newsObservable', newsObservable);
    
    const newsSubscription: Subscription = newsObservable.subscribe((data: any) => {
      console.log('​NewsSearchService:: testHNAlgoliaSearch() -> data', data);
    });

    const newsObsPiped: Observable<any> = newsObservable.pipe(
      map((data: any) => {
        console.log('​NewsSearchService:: testHNAlgoliaSearch() -> data', data);
      })
    );

    
  }
}
