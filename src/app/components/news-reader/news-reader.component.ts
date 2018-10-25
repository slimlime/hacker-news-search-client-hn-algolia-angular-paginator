import { PageTrack, ButtonConfig } from './../button/button.component';
/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-25 05: 23: 34
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 21: 42: 34
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { mergeAll, mergeMap, map } from 'rxjs/operators';
import { SearchHits } from './../../models/search-results-hits';
import { NewsSearchService } from './../../services/news-search.service';



@Component({
  selector   : 'app-news-reader',
  templateUrl: './news-reader.component.html',
  styleUrls  : ['./news-reader.component.css']
})
export class NewsReaderComponent implements OnInit {
  news$: Observable<SearchHits>;

  searchInputSubject$: Subject<string> = new Subject<string>();

  buttonNav
  constructor( 
    public activatedRoute   : ActivatedRoute,
    public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {
    // Set up news feed reactive data source
    this.news$ = this.setupNewsSubscriptionSource(
      this.newsSearchService, 
      this.searchInputSubject$
    );
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
        console.log('​NewsReaderComponent:: params', params);
        const pageNumber: number = params.get("pageNumber");

        const pageTrackOptions: PageTrack = this.setupPageTrack(
          navType, 
          pageNumber, 
          50 // - TODO: placeholder totalNumPage until forkjoin other news$
        ); 
        console.log('​NewsReaderComponent:: pageTrackOptions', pageTrackOptions);

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
   *
   * @param {Observable<SearchHits>} news$
   * @param {NewsSearchService} newsSearchService
   * @memberof NewsReaderComponent
   */
  setupNewsSubscriptionSource(
    newsSearchService  : NewsSearchService,
    searchInputSubject$: Subject<string>
    )                  : Observable<SearchHits> {

    
    const routerParamSub: Subscription = this.activatedRoute.paramMap.subscribe(
      (params: Params) => {

      }
    )

  
    // // Setup/subscribe to reactive news search results.
    // // Prepare reactivity into news search service for user input as they occur.
    // const searchObs: Observable<SearchHits> = newsSearchService
    //   .searchRealtimeValidated(searchInputSubject$, pageNum)
    // ;
    
    // this.activatedRoute.paramMap.pipe(
    //   mergeMap((searchObs) => {
    //     console.log('​NewsReaderComponent:: searchObs', searchObs);


        
    //   })
    // )
    const searchMergedObs = this.activatedRoute.paramMap.pipe(
      map((param: ParamMap) => {
        console.log('​NewsReaderComponent:: param', param);
        const pageNum                              = param.get("pageNumber");
        const lolSearchObs: Observable<SearchHits> = newsSearchService
          .searchRealtimeValidated(searchInputSubject$, pageNum);
        return lolSearchObs
      }),
      mergeAll() // MERGE!
    );

    
    // Return the reactive data source
    return searchMergedObs;
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

    searchInputSubject$.next(searchTopic); // Feels hacky/suboptimal

  }
}
