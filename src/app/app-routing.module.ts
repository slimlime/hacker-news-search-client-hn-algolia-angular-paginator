/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 14: 58: 40
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 16: 45: 16
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsReaderComponent } from './components/news-reader/news-reader.component';

const appRoutes: Routes = [
  {
    path      : "",
    redirectTo: "/news-reader/1",   // Literal value. Cannot use placeholder param
    pathMatch : "full"
  },
  {
    path     : "news-reader/:pageNumber",
    component: NewsReaderComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,   // - DEBUG: 
        useHash      : true
      } 
    ),
    CommonModule
  ],
  exports     : [RouterModule],   // Exported for Angular router directives
  declarations: []
})
export class AppRoutingModule { }
