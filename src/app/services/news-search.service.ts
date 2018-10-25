import { SearchHits } from './../models/search-results-hits';
/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 19: 01: 06
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 21: 06: 41
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, 
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';


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
  readonly baseSearchHNAlgoliaUrl: string = "https://hn.algolia.com/api/v1/search";

  readonly searchUrlParamKey: string = "query"

  /**
   * NOTE: - IMPORTANT: Empirically discovered hn algolia hard limit first *1000 hits*
   * Depends on REST API configuration on their side, or use browse method.
   * Page limit of 50 with 20 standard rows corresponds to this limit.
   * `https://www.algolia.com/doc/faq/index-configuration/how-can-i-retrieve-all-the-records-in-my-index`
   * @type {string}
   * @memberof NewsSearchService
   */
  readonly searchUrlPageParamKey: string = "page";

  /**
   * Creates an instance of NewsSearchService.
   * @param {HttpClient} httpClient
   * @memberof NewsSearchService
   */
  constructor( public httpClient: HttpClient) {
    
  }

  /**
   * If already have an Observable/Subject set up emitting, easy just plug it 
   * into the search service to manage the input events.??
   * 
   * - WARNING: -- maybe defunct now.
   *
   * @param {Observable<string>} searchInputsObs
   * @returns {Observable<SearchHits>}
   * @memberof NewsSearchService
   */
  searchRealtimeValidated(searchInputsObs: Observable<string>): Observable<SearchHits> {
    return searchInputsObs.pipe(
      // Milliseconds to wait until input is stable.
      debounceTime(400),
      
      // Distinct topic search terms only.
      distinctUntilChanged(),

      // Discards results of prev outdated emissions. New input for GET call. 
      // Maintains most recent Observable.
      switchMap(searchInputTopic => {
        const searchHNObservable = this.searchHNArticles(searchInputTopic);
        return searchHNObservable;
      })
      
    );

  }

  /**
   * Searches for Hacker News articles using the Algolia REST Search API
   * 
   * Not private in case AOT compile
   * No rate safety in-built? 
   * Rate-limiter in NewsSearchService instead of UI searchbar component
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
