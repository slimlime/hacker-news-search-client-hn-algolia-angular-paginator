/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 19: 01: 06
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 22: 43: 44
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { SearchHits } from './../models/search-results-hits';





export interface NewsSearchOpts {
  readonly userInput?: string;
  readonly pageNum   : string;
}

/**
 * HN Algolia news search service providing config, utility and safe searching..
 *: gem: 
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

  /**
   * Key value query parameter for search API
   *
   * @type {string}
   * @memberof NewsSearchService
   */
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
   * @param {Observable<string>} searchQueryOptsObs
   * @param {string} pageNumber virtual page of algolia search results. Limited.
   * @returns {Observable<SearchHits>}
   * @memberof NewsSearchService
   */
  searchSimples(
    searchInputsObs: Observable<string>,
    pageNumber     : string
    )              : Observable<SearchHits> {
    const newsSearchingOptsObs: Observable<SearchHits> = searchInputsObs.pipe(
      // Milliseconds to wait until input is stable.
      debounceTime(400),
      
      // Distinct topic search terms only.
      distinctUntilChanged(),

      // Discards results of prev outdated emissions. New input for GET call. 
      // Maintains most recent Observable.
      switchMap((searchInputTopic) => {
        const searchHNObservable = this.searchHNArticles(
          searchInputTopic,
          pageNumber
        );
        return searchHNObservable;
      })
    );

    return newsSearchingOptsObs;
  }
  /**
   * If already have an Observable/Subject set up emitting, easy just plug it 
   * into the search service to manage the input events.??
   * 
   * @param {Observable<string>} searchQueryOptsObs
   * @param {string} pageNumber virtual page of algolia search results. Limited.
   * @returns {Observable<SearchHits>}
   * @memberof NewsSearchService
   */
  searchRealtimeValidated(
    searchInputsObs   : Observable<string>,
    searchQueryOptsObs: Observable<NewsSearchOpts>
    )                 : Observable<SearchHits> {
    const newsSearchingOptsObs: Observable<string> = searchInputsObs.pipe(
      // Milliseconds to wait until input is stable.
      debounceTime(400),
      
      // Distinct topic search terms only.
      distinctUntilChanged(),
    );

    // Combined obs as both sources of data are naturally reactive. User input and route params
    const searchInputPageCombo: Observable<[string, NewsSearchOpts]> = combineLatest(
      newsSearchingOptsObs,
      searchQueryOptsObs
    );

    const searchResultsObs = searchInputPageCombo.pipe(
      // Discards results of prev outdated emissions. New input for GET call. 
      // Maintains most recent Observable.
      switchMap(([searchInput, searchQueryOpts]: [string, NewsSearchOpts]) => {
        const searchHNObservable = this.searchHNArticles(
          searchInput,
          searchQueryOpts.pageNum
        );
        return searchHNObservable;
      })
    )

    return searchResultsObs;
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
  searchHNArticles(searchInput: string, pageNumber: string): Observable<SearchHits> {

    // Debounce and distinct to prevent unnecessary DOS.

    // 1. First build the http parameters for the search query. GET
    
    const httpSearchParams: HttpParams = this.getHttpParams(
      searchInput,
      pageNumber
    );
    console.log('​NewsSearchService:: httpSearchParams', httpSearchParams);
    
    // Set up the httpClient options object (No interface provided)
    // 2. Set up the observable to receive the news results
    /** 
     * Destructured http options object { headers, params, ...}
     * Options object parameter doesn't have an interface in Angular :sad: 
     */
    const newsObservable: Observable<any> = this.httpClient.get( 
      this.baseSearchHNAlgoliaUrl, 
      {params: httpSearchParams}
    );


    return newsObservable;
  }

  /**
   * Utility function to build httpSearchParam
   * Accesses immutable reaonly parameter key values
   *
   * @param {string} searchInput
   * @param {string} pageNumber
   * @returns {HttpParams}
   * @memberof NewsSearchService
   */
  getHttpParams(searchInput: string, pageNumber: string): HttpParams {
    const httpSearchParams: HttpParams = new HttpParams()
      .set(this.searchUrlParamKey, searchInput)
      .set(this.searchUrlPageParamKey, pageNumber)
    ;
    return httpSearchParams;
  }
}
