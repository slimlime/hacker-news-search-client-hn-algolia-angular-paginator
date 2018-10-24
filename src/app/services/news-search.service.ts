/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 19: 01: 06
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 05: 29: 50
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 *
 *
 * @export
 * @class NewsSearchService
 */
@Injectable({
  providedIn: 'root'
})
export class NewsSearchService {

  /**
   * Base url for `hn.algolia` RESTful API search endpoint
   * 
   * Could implement a config.json service provider.
   * Could abstract a query builder but YAGNI.
   * @see `https://hn.algolia.com/api` for more information
   * @type {string}
   * @memberof NewsSearchService
   */
  readonly baseSearchHNAlgoliaUrl: string = "http://hn.algolia.com/api/v1/search";

  readonly searchUrlParamKey: string = "query"

  /**
   * Creates an instance of NewsSearchService.
   * @param {HttpClient} httpClient
   * @memberof NewsSearchService
   */
  constructor( public httpClient: HttpClient) {
    this.testHNAlgoliaSearch();
    
  }


  /**
   * Searches for Hacker News articles using the Algolia REST Search API
   * 
   * Return Observable for subscribing at the top component.
   * Always bubble reactivity as high up as possible.
   * @param {string} searchInput topic keywords
   * @returns {Observable}
   * @memberof NewsSearchService
   */
  searchHNArticles(searchInput: string): Observable<any> {

    // Debounce and distinct to prevent unnecessary DOS.

    // 1. First build the http parameters for the search query. GET
    const searchParamValue: string = searchInput;  // strings are passed by value anyway.
    // Immutable. Using this. properties that are readonly instead of local const
    const httpSearchParams: HttpParams = new HttpParams().set(
      this.searchUrlParamKey, searchParamValue
    )
    // Set up the httpClient options object (No interface provided)
    // 2. Set up the observable to receive the news results
    /** 
     * Destructured http options object { headers, params, ...}
     * Options object parameter doesn't have an interface in Angular :sad: 
     */
    const newsObservable: Observable<any> = this.httpClient.get( 
      this.baseSearchHNAlgoliaUrl, {params: httpSearchParams}
    );


    return newsObservable;
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
