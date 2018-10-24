/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 19: 01: 06
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 19: 08: 30
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewsSearchService {

  constructor( public httpClient: HttpClient) {


  }

  testHNAlgoliaSearch() {
    // this.httpClient.get(url, options, header, param)
  }
}
