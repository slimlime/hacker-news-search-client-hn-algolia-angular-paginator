/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-25 05: 23: 34
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-26 05: 48: 35
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';

import { SearchHits } from './../../models/search-results-hits';
import { NewsSearchService, NewsSearchOpts } from './../../services/news-search.service';
import { ButtonConfig, PageTrack } from './../button/button.component';

@Component({
  selector   : 'app-news-reader',
  templateUrl: './news-reader.component.html',
  styleUrls  : ['./news-reader.component.scss']
})
export class NewsReaderComponent implements OnInit {
  /**
   * Set up for the reactive stream for news search feed
   *
   * @type {Observable<SearchHits>}
   * @memberof NewsReaderComponent
   */
  news$: Observable<SearchHits>;

  /**
   * Input stream that can be `next`ed with new user input
   * emitted by `input-search-bar` component's `@Output`
   * Bound`@Output() searchTopic`
   *
   * @type {Subject<string>}
   * @memberof NewsReaderComponent
   */
  searchInputSubject$: Subject<string> = new Subject<string>();

  /**
   * Search query parameters changing reactive stream to be handled by 
   * newsSearchService
   * 
   * Over-engineered = buggy? Parameters to facilitate search.
   * -- TODO: Break up interfaces and re-architect project structure.
   * @type {Observable<NewsSearchOpts>}
   * @memberof NewsReaderComponent
   */
  searchQueryParam$: Observable<NewsSearchOpts> = new Observable<NewsSearchOpts>();

  /**
   * Initial page number for `hn algolia` search query parameter.
   *
   * @type {string}
   * @memberof NewsReaderComponent
   */
  currentPageNumber: string = "0";

  buttonNav
  constructor( 
    public activatedRoute   : ActivatedRoute,
    public newsSearchService: NewsSearchService,
    public router           : Router
  ) {

  }

  ngOnInit() {

    this.searchQueryParam$ = this.activatedRoute.paramMap.pipe(
      map((paramMap: ParamMap) => {
        const pageNum: string = paramMap.get("pageNumber");

        const searchOpts: NewsSearchOpts = {pageNum: pageNum};

        return searchOpts
      })
    )
    // Set up news feed reactive data source
    this.news$ = this.setupNewsSubscriptionSource(
      this.newsSearchService, 
      this.searchInputSubject$,
      this.searchQueryParam$,
      this.currentPageNumber
    );
    
    this.setupPageInitSearchTopicsInput(this.searchInputSubject$); // Probably should keep local state.
    this.setupPageInitPageNumberIDForSearchPush(); 
  }


  /**
   * -- TODO: Fix reactivity sequence for initial view not working.
   * Initial setup of page feed search input
   * Resolves new page load search to include a search page topic for first results.
   * 
   * @param {Subject<string>} newsSearchInputSubject Subject to push the topic input to.
   * @default {string} search topic value of 'Deep Learning'
   * @param {string} [searchTopic='Deep Learning'] Default search topic
   * @memberof NewsReaderComponent
   */
  setupPageInitSearchTopicsInput(
    newsSearchInputSubject: Subject<string>,
    searchTopic           : string = 'Deep Learning'
    )                     : void {
      
    console.log('​NewsReaderComponent:: setupPageInitSearchTopicsInput -> newsSearchInputSubject', newsSearchInputSubject);
    console.log('​NewsReaderComponent:: setupPageInitSearchTopicsInput -> searchTopic', searchTopic);
    // Required news search input subject as parameter.. Might as well use `this`.
    newsSearchInputSubject.next(searchTopic);
  }

  /**
   * Initial setup of page feed pageNumber.
   * Resolves new page load search to include a search page number param.
   * 
   *
   * @memberof NewsReaderComponent
   */
  setupPageInitPageNumberIDForSearchPush(): void {
    // Subscribe to get router url parameter pageNumber id updates.
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      
      console.log(
        '​NewsReaderComponent::',
        'setupPageInitPageNumberIDForSearchPush()',
        '-> paramMap',
        paramMap
      );
      
      const pageNum = paramMap.get("pageNumber");
      
      this.currentPageNumber = pageNum;  // Mutator
      
      console.log(
        '​NewsReaderComponent:: ',
        'setupPageInitPageNumberIDForSearchPush() -> ',
        'this.currentPageNumber',
        this.currentPageNumber
      );

    });
  }

  /**
   * Transform param pagenum observable to take in page config test
   * Template async binding to the observable returned here.
   * Feels clunky testing new techniques.
   * -- TODO: : fire: refactor
   * 
   * Probs encapsulate a clearer factory.
   * @param {*} param
   * @returns {Observable<PageTrack>}
   * @memberof NewsReaderComponent
   */
  setupNavComponentOptions(
    routerParamMap: Observable<ParamMap>,
    navType       : ButtonConfig
    )             : Observable<PageTrack> {
    // 
    const pageTrackObs: Observable<PageTrack> = routerParamMap.pipe(
      map((params: Params) => {
        // console.log('​NewsReaderComponent:: routerParamMap pipe params', params);
        const pageNumber: number = params.get("pageNumber");

        const pageTrackOptions: PageTrack = this.setupPageTrack(
          navType, 
          pageNumber, 
          50 // - TODO: placeholder totalNumPage until forkjoin other news$
        ); 

        return pageTrackOptions;
      })
    )

    return pageTrackObs;
  }

  /**
   *
   * -- redundant
   * @param {ButtonConfig} navType
   * @param {number} pageNum
   * @param {number} totalNumPages
   * @returns {PageTrack}
   * @memberof NewsReaderComponent
   */
  setupPageTrack(
    navType      : ButtonConfig,
    pageNum      : number,
    totalNumPages: number
    )            : PageTrack {
    const pageTrackOptions: PageTrack = {
      navType       : navType,
      currentPageNum: pageNum,
      totalNumPages : totalNumPages
    };
    return pageTrackOptions;
  }

  /**
   * Sets up / plugs-in user input for real-time reactive news search.
   * Main functionality
   * @param {Observable<SearchHits>} news$
   * @param {NewsSearchService} newsSearchService
   * @memberof NewsReaderComponent
   */
  setupNewsSubscriptionSource(
    newsSearchService  : NewsSearchService,
    searchInputSubject$: Subject<string>,
    searchQueryParam$  : Observable<NewsSearchOpts>,
    pageNumberParam    : string
    )                  : Observable<SearchHits> {

    // Setup reactive input streams input and query parameters.
    // `newsSearchService` handles/combines the reactive input- updates+queries.
    const searchResultsObs: Observable<SearchHits> = newsSearchService.searchRealtimeReactiveInputPager(
      searchInputSubject$,
      searchQueryParam$
    );
    
    // Return the reactive data source
    return searchResultsObs;
  }

  /**
   * Get search input text. Push the input updates into the searchInputSubject
   * For binding the event handler outputted by child search input component.
   * 
   * @example this.onUserSearchInput("Deep Learning", this.searchInputSubject);
   * @param {string} searchTopic
   * @param {Subject<string>} searchInputSubject$
   * @memberof NewsReaderComponent
   */
  onUserSearchInput(searchTopic: string, searchInputSubject$: Subject<string>): void {
    // console.log('​NewsReaderComponent:: onUserSearchInput -> searchTopic', searchTopic);

    // forkjoin or combinelatest in newssearchservice?
    
    searchInputSubject$.next(searchTopic); // Feels hacky/suboptimal

  }
  
  /**
   * Ostensibly to manage the emissions of nav button components for routing nav
   *
   * @param {PageTrack} navPageTrack
   * @param {Router} router
   * @memberof NewsReaderComponent
   */
  onUserNavButtonInteraction(navPageTrack: PageTrack, router: Router): void {
    console.log('​NewsReaderComponent:: navPageTrack', navPageTrack);
    
    // New page number to navigate to.
    const navPageNum: number = navPageTrack.newPageNavNum;

    // Navigate the paginated news feed with pageID url-passed value.
    router.navigate(['/news-reader', navPageNum]);
  }
}
