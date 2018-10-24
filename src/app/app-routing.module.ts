/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 14: 58: 40
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 15: 16: 51
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultsComponent } from './components/search-results/search-results.component';

const appRoutes: Routes = [
  {
    path      : "",
    redirectTo: "/search-results",
    pathMatch : "full"
  },
  {
    path     : "search-results",
    component: SearchResultsComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // - DEBUG: 
    ), 
    CommonModule
  ],
  exports     : [RouterModule],   // Exported for Angular router directives
  declarations: []
})
export class AppRoutingModule { }
