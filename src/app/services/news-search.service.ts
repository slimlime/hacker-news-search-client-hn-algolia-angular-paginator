import { SearchHits } from './../models/search-results-hits';
/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 19: 01: 06
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 05: 49: 46
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
    
  }


  /**
   * Searches for Hacker News articles using the Algolia REST Search API
   * 
   * No rate safety in-built? 
   * Return Observable for subscribing at the top component.
   * Always bubble reactivity as high up as possible.
   * @param {string} searchInput topic keywords
   * @returns {Observable}
   * @memberof NewsSearchService
   */
  searchHNArticles(searchInput: string): Observable<SearchHits> {

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

}
