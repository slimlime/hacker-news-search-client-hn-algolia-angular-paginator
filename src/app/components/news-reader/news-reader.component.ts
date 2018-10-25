/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-25 05: 23: 34
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 22: 45: 06
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';

import { SearchHits } from './../../models/search-results-hits';
import { NewsSearchOpts, NewsSearchService } from './../../services/news-search.service';
import { ButtonConfig, PageTrack } from './../button/button.component';

@Component({
  selector   : 'app-news-reader',
  templateUrl: './news-reader.component.html',
  styleUrls  : ['./news-reader.component.css']
})
export class NewsReaderComponent implements OnInit {
  news$: Observable<SearchHits>;

  searchInputSubject$: Subject<string> = new Subject<string>();

  searchQuerySubject$: Subject<NewsSearchOpts> = new Subject<NewsSearchOpts>();

  buttonNav
  constructor( 
    public activatedRoute   : ActivatedRoute,
    public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {
    this.initSetupPageIDSearchPush(); 

    // Set up news feed reactive data source
    this.news$ = this.setupNewsSubscriptionSource(
      this.newsSearchService, 
      this.searchInputSubject$,
      this.searchQuerySubject$
    );
    
    // Subscribed to get page ID stream which is using in combination with the user input stream
    // for News Search querying
    const routePageParamSub = this.activatedRoute.paramMap
      .subscribe((paramMap: ParamMap) => {
        const pageNumber: string = paramMap.get("pageNumber");
        console.log('​NewsReaderComponent:: ngOnInit() -> pageNumber', pageNumber);
        const newsSearchQueryOpts: NewsSearchOpts = {
          pageNum: pageNumber
        }
        this.searchQuerySubject$.next(newsSearchQueryOpts)
      });

  }

  initSetupPageIDSearchPush() {
    // Default
    const newsSearchQueryOpts: NewsSearchOpts = {
      pageNum: "0"
    }
    this.searchQuerySubject$.next(newsSearchQueryOpts);
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
        console.log('​NewsReaderComponent:: routerParamMap pipe params', params);
        const pageNumber: number = params.get("pageNumber");

        const pageTrackOptions: PageTrack = this.setupPageTrack(
          navType, 
          pageNumber, 
          50 // - TODO: placeholder totalNumPage until forkjoin other news$
        ); 
        // console.log('​NewsReaderComponent:: pageTrackOptions', pageTrackOptions);

        return pageTrackOptions;
      })
    )

    return pageTrackObs;
  }

  setupPageTrack(navType: ButtonConfig,
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
    searchQuerySubject$: Subject<NewsSearchOpts>
    )                  : Observable<SearchHits> {

  

    // const searchObs: Observable<SearchHits> = newsSearchService
    //   .searchRealtimeValidated(searchInputSubject$, pageNum)
    // ;
    
    // this.activatedRoute.paramMap.pipe(
    //   mergeMap((searchObs) => {
    //     console.log('​NewsReaderComponent:: searchObs', searchObs);


        
    //   })
    // )

    const searchResultsObs: Observable<SearchHits> = newsSearchService.searchRealtimeValidated(
      searchInputSubject$,
      searchQuerySubject$
    );
    // // Setup/subscribe to reactive news search results.
    // // Prepare reactivity into news search service for user input as they occur.
    // const searchMergedObs = this.activatedRoute.paramMap.pipe(
    //   map((param: ParamMap) => {
    //     console.log('​NewsReaderComponent:: param', param);
    //     const pageNum                              = param.get("pageNumber");
    //     const lolSearchObs: Observable<SearchHits> = newsSearchService
    //       .searchRealtimeValidated(
    //         searchInputSubject$,
    //         searchQuerySubject$
    //       );
    //     return lolSearchObs
    //   }),
    //   mergeAll() // MERGE! -- TODO: replace with mergeMap/flatMap more elegant.
    // );

    
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
    console.log('​NewsReaderComponent:: onUserSearchInput -> searchTopic', searchTopic);

    // forkjoin or combinelatest in newssearchservice?
    
    searchInputSubject$.next(searchTopic); // Feels hacky/suboptimal

  }
}
